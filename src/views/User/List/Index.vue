<template>
  <div
    class="main listPage"
    v-show="this.zone"
  >
    <div class="search">
      <div class="box">
        <i class="icon">&#xe628;</i>
        <input
          type="text"
          placeholder="植物/建筑名称"
          class="text"
          v-model="name"
        />
      </div>
    </div>
    <div class="banner">
      <a href="javascript:void(0);">
        <img src="../../../assets/img/list-banner.png" />
        <h1>{{this.zone ? this.zone.name: ''}}<br>&nbsp;&nbsp;&nbsp;欢迎您！</h1>
      </a>
    </div>
    <div class="pageBox">
      <div class="scrollTxt">
        <a href="javascript:void(0);">
          <div class="l">
            <i class="icon">&#xe625;</i>
          </div>
          <div class="c">
            <p>{{this.zone ? this.zone.intro : ""}}</p>
          </div>
          <!-- <div class="r">
            <i class="icon">&#xe61e;</i>
          </div> -->
        </a>
      </div>
      <div class="list">
        <ul v-if="this.objList && this.objList.length > 0">
          <li
            v-for="(obj , i ) in this.objList"
            :key="i"
          >
            <a @click="goTo(obj.objType,obj.id)">
              <div class="pic">
                <img
                  v-if="obj.pictList && obj.pictList.length > 0"
                  :src="obj.pictList[0].url"
                />
                <img
                  v-else
                  src="../../../assets/img/sz.jpg"
                />
              </div>
              <p>{{obj.objName}}</p>
            </a>
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
import commonUtil from "@/utils/commonUtil";
import { zoneApi } from "@/api";
import ListLoadding from "@/views/components/ListLoadding/Index.vue";

@Component({
  components: {
    ListLoadding
  }
})
export default class List extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
  private id: any = ""; // 园区id
  private zone: any = null; // 园区数据
  private page: number = 1;
  private pageSize: number = 10;
  private objList: any[] = []; // 植物/建筑数据
  private committing: boolean = false; // 翻页锁定状态
  private loadding: boolean = false;
  private name: string | null = null; // 顶部园区名称

  /**
   * 定义注册的监听函数
   */
  private listenerScroll($event: any) {
    this.throttle(this.handleScroll, 500, 500, $event)();
  }

  created() {
    this.id = commonUtil.getUrlParam("id", window.location.search);
    if (this.id) {
      this.getZoneDetail();
      this.getObjList();
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
      this.getObjList(true);
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
   * 获取园区详情
   */
  async getZoneDetail() {
    const res = await zoneApi.getDetail(this.id);
    if (res.success) {
      this.zone = res.data;
    }
  }

  /**
   * 监听顶部搜索框
   */
  @Watch("name")
  private changeValue(newValue: any, oldValue: any) {
    this.name = newValue;
    this.getObjList();
  }

  /**
   * 获取园区对象列表
   */
  async getObjList(concat: boolean = false) {
    if (!concat) {
      this.page = 1;
      this.objList = [];
    }
    this.committing = true;
    this.loadding = true;
    const param: any = {
      zoneId: this.id,
      page: this.page,
      pageSize: this.pageSize
    };
    if (this.name) {
      param.objName = this.name;
    }
    const res = await zoneApi.getObjList(param);
    this.loadding = false;
    if (res.success && res.data) {
      // this.zoneList = res.data.items;
      if (this.objList && this.objList.length >= res.data.total) {
        // 翻到最后一页了
        // console.log("page:" + this.page);
        return;
      }
      ++this.page; // 当前页+1
      this.committing = false; // 释放锁定状态
      if (concat) {
        // 将当前数据拼接到已有数据中
        this.objList = this.objList.concat(res.data.items);
      } else {
        this.objList = res.data.items;
      }
    }

    this.committing = false;
  }

  goTo(objType: number, id: number) {
    let url: string = "";
    if (objType === 1) {
      url = "/plantDetail";
    } else if (objType === 2) {
      url = "/buildDetail";
    }

    url += `?id=${id}&src=${encodeURIComponent(window.location.href)}`;
    this.$router.push(url);
  }
}
</script>