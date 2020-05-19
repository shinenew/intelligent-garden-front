<template>
  <div class="main indexPage">
    <header>
      <div class="headerCon">
        <h1>首页</h1>
      </div>
    </header>
    <div class="search">
      <div class="box">
        <i class="icon">&#xe628;</i>
        <input
          type="text"
          placeholder="请输入园区名称"
          class="text"
          v-model="name"
        />
      </div>
      <button
        class="icon"
        @click="openScan"
      >&#xe629;</button>
    </div>
    <div class="fastNav">
      <a href="javascript:void(0);">
        <i class="icon">&#xe62c;</i>
        <p>园区{{this.statData ? this.statData.zoneTotal : null}}家</p>
      </a>
      <a href="javascript:void(0);">
        <i class="icon">&#xe62d;</i>
        <p>植物{{this.statData ? this.statData.plantTotal : null}}类</p>
      </a>
      <a href="javascript:void(0);">
        <i class="icon">&#xe62e;</i>
        <p>建筑{{this.statData ? this.statData.buildTotal : null}}个</p>
      </a>
    </div>
    <div class="pageBox">
      <div class="list">
        <ul v-if="this.zoneList && this.zoneList.length > 0">
          <li
            v-for="(zone, i) in this.zoneList"
            :key="i"
          >
            <router-link :to="`/list?id=${zone.id}`">
              <div class="pic">
                <img :src="zone.pictureList && zone.pictureList.length > 0 ? zone.pictureList[0].url : '/img/def-pic.png'" />
              </div>
              <dl>
                <dt>{{zone.name}}</dt>
                <dd>
                  <p>{{zone.intro}}</p>
                  <b class="orange">{{zone.plantCount}}颗植物，{{zone.buildCount}}个建筑</b>
                </dd>
              </dl>
            </router-link>
          </li>
        </ul>
        <!-- 列表加载中 -->
        <ListLoadding :loadding="loadding" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { zoneApi, authApi } from "@/api";
import ListLoadding from "@/views/components/ListLoadding/Index.vue";
import wx from "wx-sdk-ts";

@Component({
  components: {
    ListLoadding
  }
})
export default class Index extends Vue {
  private zoneList: any[] = []; // 园区列表
  private page: number = 1;
  private pageSize: number = 5;
  private statData: any = null; // 统计数据
  private committing: boolean = false; // 翻页锁定状态
  private loadding: boolean = false;
  private name: string | null = null; // 顶部园区名称

  private wxAppId: string = "wxfb3c5c54aa86b833";
  private wxJssdkConfig!: any;

  /**
   * 定义注册的监听函数
   */
  private listenerScroll($event: any) {
    this.throttle(this.handleScroll, 500, 500, $event)();
  }

  created() {
    this.getStat();
    this.getZoneList();

    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      this.getWxConfig();
    }
  }

  private async getWxConfig() {
    // 获取jssdk配置
    const url = window.location.href;
    // console.log("当前url：" + url);
    // console.log("编码后url：" + encodeURIComponent(url));
    const res = await authApi.getWxJsSdkConfig({
      url: encodeURIComponent(url)
    });

    // console.log(res);
    if (res.success && res.data) {
      this.wxJssdkConfig = res.data;
      const self = this;

      // 注入配置
      wx.config({
        debug: false,
        appId: this.wxAppId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
          "scanQRCode"
        ]
      });
    } else {
      (window as any).alert("获取微信jssdk失败", false);
    }
  }

  /**
   * 渲染完成后，注册滚动事件
   */
  mounted() {
    document.addEventListener("scroll", this.listenerScroll, true);
  }

  /**
   * 页面销毁之前注销注册的事件
   */
  beforeDestroy() {
    document.removeEventListener("scroll", this.listenerScroll, true);
  }

  /**
   * 滚动
   */
  private handleScroll(e: any) {
    if (this.committing) {
      return;
    }
    if (e instanceof Event) {
      var el: any = e.target;
      var scHeight = el.scrollHeight,
        scTop = el.scrollTop,
        clHeight = el.clientHeight;
      //距离底部100px时，开始加载数据
      if (scHeight - scTop > clHeight + 100) return;
      // 发送请求
      this.getZoneList(true);
    }
  }

  /**
   * 函数节流
   * fn:延时调用函数
   * delay:延迟时间，单位毫秒
   * atleast:至少多长时间触发一次
   */
  private throttle(fn: any, delay: number, atleast: any, event: any) {
    let timer: any = null;
    let previous: any = null;
    return function() {
      var now = +new Date();
      if (!previous) previous = now;
      if (atleast && now - previous > atleast) {
        fn(event);
        // 重置上一次开始时间为本次结束时间
        previous = now;
        clearTimeout(timer);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn(event);
          previous = null;
        }, delay);
      }
    };
  }

  /**
   * 获取统计数据
   */
  async getStat() {
    const res = await zoneApi.getStatistics();
    if (res.success) {
      this.statData = res.data;
    }
  }

  @Watch("name")
  private changeValue(newValue: any, oldValue: any) {
    this.name = newValue;
    this.getZoneList();
  }

  /**
   * 获取园区列表
   */
  async getZoneList(concat: boolean = false) {
    if (!concat) {
      this.page = 1;
      this.zoneList = [];
    }
    this.committing = true;
    this.loadding = true;
    const param: any = {
      page: this.page,
      pageSize: this.pageSize,
      status: 1
    };
    if (this.name) {
      param.name = this.name;
    }
    const res = await zoneApi.getPageList(param);
    this.loadding = false;

    if (res.success && res.data) {
      // this.zoneList = res.data.items;
      if (this.zoneList && this.zoneList.length >= res.data.total) {
        // 翻到最后一页了
        // console.log("page:" + this.page);
        return;
      }
      ++this.page; // 当前页+1
      this.committing = false; // 释放锁定状态
      if (concat) {
        // 将当前数据拼接到已有数据中
        this.zoneList = this.zoneList.concat(res.data.items);
      } else {
        this.zoneList = res.data.items;
      }
    }

    this.committing = false;
  }

  openScan() {
    const self = this;
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: async function(res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        // alert(result);
        // http://wechat.huiyuanlin.cn/buildDetail?id=
        // http://wechat.huiyuanlin.cn/plantDetail?id=
        if (result) {
          if (
            result.indexOf("buildDetail") >= 0 ||
            result.indexOf("plantDetail") >= 0
          ) {
            window.location.href = result;
          } else {
            alert("该二维码不是植物或建筑二维码");
          }
        }
      }
    });
  }
}
</script>