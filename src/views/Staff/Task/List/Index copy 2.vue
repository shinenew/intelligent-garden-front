<template>
  <div class="main staffHome">
    <header>
      <div class="headerCon">
        <a
          href="javascript:void(0)"
          class="icon arr"
        >&#xe626;</a>
        <h1>任务管理</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="tab">
        <ul>
          <li
            :class="status === 0 ? 'cu' : ''"
            @click="changeStatus(0)"
            style="width: 33%;"
          >
            <span>
              待完成
              <em v-show="this.unReceiveCount > 0">{{this.unReceiveCount}}</em>
            </span>
          </li>
          <li
            @click="changeStatus(1)"
            :class="status === 1 ? 'cu' : ''"
            style="width: 33%;"
          >
            <span>
              已领取
              <em v-show="this.receiveCount > 0">{{this.receiveCount}}</em>
            </span>
          </li>
          <li
            style="width: 33%;"
            @click="changeStatus(9)"
            :class="status === 9 ? 'cu' : ''"
          >
            <span>
              已完成
              <em v-show="this.finishCount > 0">{{this.finishCount}}</em>
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
              @click="receiveTask(task.id)"
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
import commonUtil from "@/utils/commonUtil";
import { staffApi } from "@/api";
import moment from "moment";

@Component({
  components: {
    NavComponent,
    ListLoadding
  }
})
export default class List extends Vue {
  private status: number = 0;
  private page: number = 1;
  private pageSize: number = 10;
  private taskList: any[] = [];
  private unReceiveCount: number = 0;
  private receiveCount: number = 0;
  private finishCount: number = 0;
  private committing: boolean = false; // 翻页锁定状态
  private loadding: boolean = false;

  /**
   * 定义注册的监听函数
   */
  private listenerScroll($event: any) {
    this.throttle(this.handleScroll, 500, 500, $event)();
  }

  created() {
    let status = commonUtil.getUrlParam("status", window.location.search);
    if (!status) {
      status = "0";
    }
    this.status = parseInt(status);
    this.getTaskList();
    // this.getTaskCount();
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

    const res3 = await staffApi.getTaskDetailPageList({
      page: this.page,
      pageSize: this.pageSize,
      status: 9
    });
    if (res3.success && res3.data) {
      this.finishCount = res3.data.total;
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
  async receiveTask(taskId: number) {
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
}
</script>