<template>
  <div class="main staffHome">
    <header>
      <div class="headerCon">
        <!-- <a
          href="javascript:void(0)"
          class="icon arr"
        >&#xe626;</a> -->
        <h1>首页</h1>
      </div>
    </header>
    <div class="pageBox">
      <div
        class="scan"
        @click="scan"
      >
        <img src="../../../assets/img/scan.png" />
      </div>
      <div class="tab">
        <ul>
          <li
            :class="status === 0 ? 'cu' : ''"
            @click="changeStatus(0)"
          >
            <span>
              待完成任务
              <em v-show="this.unReceiveCount > 0">{{this.unReceiveCount}}</em>
            </span>
          </li>
          <li
            @click="changeStatus(1)"
            :class="status === 1 ? 'cu' : ''"
          >
            <span>
              已领取任务
              <em v-show="this.receiveCount > 0">{{this.receiveCount}}</em>
            </span>
          </li>
        </ul>
      </div>
      <div class="taskList">
        <ul v-if="taskList && taskList.length > 0">
          <li
            v-for="(task,i) in taskList"
            :key="i"
          >
            <a
              @click="goTo(task.id)"
              class="btn btnMiddel"
              v-if="task.status === 1"
            >完成任务</a>
            <a
              class="btn btnMiddel"
              v-if="task.status === 0"
              href="javascript:void(0);"
              @click="receiveTask(task.id, false)"
            >
              领取任务
            </a>
            <dl>
              <dt>
                {{task.zoneName}}
                <b :class="getDateDiff(task.startDate, task.endDate) < 0 ? 'blue' : ''">{{getTaskDate(task.startDate, task.endDate)}}</b>
              </dt>
              <dd>
                <p>{{task.logicArea}}</p>
                <p>{{task.content}}</p>
              </dd>
            </dl>
          </li>
          <!-- 列表加载中 -->
          <ListLoadding :loadding="loadding" />
        </ul>

        <!-- 没有数据时 -->
        <div
          class="nodata"
          v-else
        >
          <div class="tip">
            <dl>
              <dt><img src="~@/assets/img/img-blxx.png" /></dt>
              <dd>
                <p>暂无数据~</p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <NavComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavComponent from "@/views/components/StaffNav/Index.vue";
import ListLoadding from "@/views/components/ListLoadding/Index.vue";
import { Getter, namespace } from "vuex-class";
import commonUtil from "@/utils/commonUtil";
import IUserInfo from "@/constant/DataModel/IUserInfo";
import { staffApi, authApi, adminApi } from "@/api";
import moment from "moment";
import wx from "wx-sdk-ts";
const userModule = namespace("user");

@Component({
  components: {
    NavComponent,
    ListLoadding
  }
})
export default class Index extends Vue {
  private status: number = 0;
  private page: number = 1;
  private pageSize: number = 10;
  private taskList: any[] = [];
  private unReceiveCount: number = 0;
  private receiveCount: number = 0;
  private committing: boolean = false; // 翻页锁定状态
  private loadding: boolean = false;
  private wxAppId: string = "wxfb3c5c54aa86b833";
  private wxJssdkConfig!: any;

  /**
   * 登录用户信息
   */
  @userModule.Getter("user")
  private user!: IUserInfo;

  /**
   * 登录角色
   */
  get role() {
    return this.user && this.user.roles && this.user.roles.length > 0
      ? this.user.roles[0].id
      : null;
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
   * 定义注册的监听函数
   */
  private listenerScroll($event: any) {
    this.throttle(this.handleScroll, 500, 500, $event)();
  }

  created() {
    // console.log(this.role);

    let status = commonUtil.getUrlParam("status", window.location.search);
    if (!status) {
      status = "0";
    }
    this.status = parseInt(status);
    this.getTaskList();
    this.getTaskCount();

    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      this.getWxConfig();
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
      this.getTaskList(true);
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
   * 获取订单数
   */
  async getTaskCount() {
    const res = await staffApi.getTaskDetailPageList({
      page: this.page,
      pageSize: this.pageSize,
      status: 0
    });
    if (res.success && res.data) {
      this.unReceiveCount = res.data.total;
    }

    const res2 = await staffApi.getTaskDetailPageList({
      page: this.page,
      pageSize: this.pageSize,
      status: 1
    });
    if (res2.success && res2.data) {
      this.receiveCount = res2.data.total;
    }
  }

  /**
   * 获取任务列表
   */
  async getTaskList(concat: boolean = false) {
    if (!concat) {
      this.page = 1;
      this.taskList = [];
    }
    this.committing = true;
    this.loadding = true;
    const res = await staffApi.getTaskDetailPageList({
      page: this.page,
      pageSize: this.pageSize,
      status: this.status
    });
    this.loadding = false;
    if (res.success && res.data) {
      // this.zoneList = res.data.items;
      if (this.taskList && this.taskList.length >= res.data.total) {
        // 翻到最后一页了
        // console.log("page:" + this.page);
        return;
      }
      ++this.page; // 当前页+1
      this.committing = false; // 释放锁定状态
      if (concat) {
        // 将当前数据拼接到已有数据中
        this.taskList = this.taskList.concat(res.data.items);
      } else {
        this.taskList = res.data.items;
      }
    }

    this.committing = false;
  }

  /**
   * 领取任务
   */
  async receiveTask(taskId: number, goDetail: boolean = false) {
    const res = await staffApi.receiveTask({
      id: taskId
    });
    if (!res.success) {
      alert("领取任务失败：" + res.errMsg);
      return;
    }

    this.getTaskCount();
    this.getTaskList();
    alert("任务领取成功");
    if (goDetail) {
      this.goTo(taskId);
    }
  }

  /**
   * 切换状态
   */
  changeStatus(status: number) {
    this.status = status;
    this.getTaskList();
  }

  /**
   * 获取任务日期
   */
  getTaskDate(startDate: number, endDate: number) {
    if (startDate === endDate) {
      return this.formatDate(startDate, "MM月DD日");
    } else {
      return `${this.formatDate(startDate, "MM月DD日")} ~ ${this.formatDate(
        endDate,
        "MM月DD日"
      )}`;
    }
  }

  /**
   * 获取时间间隔
   */
  getDateDiff(endDate: number) {
    return moment().diff(endDate, "days");
  }

  /**
   * 格式化日期
   */
  formatDate(val: number, format: string = "YYYY-MM-DD") {
    return moment(val).format(format);
  }

  /**
   * 跳转到
   */
  goTo(id: number) {
    const url = `/staff/task/process?id=${id}&src=${encodeURIComponent(
      window.location.href + "?status=" + this.status
    )}`;
    this.$router.push(url);
  }

  scan() {
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
            // 建筑
            const objType = result.indexOf("buildDetail") >= 0 ? 2 : 1;
            const objId = result.replace(
              "http://wechat.huiyuanlin.cn/plantDetail?id=",
              ""
            );
            const res = await adminApi.getTaskDetailListById({
              objType: objType,
              objId: objId
            });
            if (res.success && res.data) {
              const unReceive = res.data.filter((p: any) => p.status === 0);
              if (unReceive && unReceive.length > 0) {
                (window as any).confirm(
                  `该${
                    objType === 2 ? "建筑" : "植物"
                  }存在未领取的养护任务，是否立即领取并前往完成？`,
                  function() {
                    self.receiveTask(unReceive[0].id, true);
                  }
                );
                return;
              }

              const unFinish = res.data.filter((p: any) => p.status === 1);
              if (unFinish && unFinish.length > 0) {
                (window as any).confirm(
                  `该${
                    objType === 2 ? "建筑" : "植物"
                  }存在未完成的养护任务，是否立即前往完成？`,
                  function() {
                    self.$router.push("/staff/task/Process?id=" + objId);
                  }
                );
                return;
              }

              alert(`该${objType === 2 ? "建筑" : "植物"}没有指派给您的任务`);
            }
          } else {
            alert("该二维码不是植物或建筑二维码");
          }
        }

        // 查询该植物/建筑
      }
    });
  }
}
</script>