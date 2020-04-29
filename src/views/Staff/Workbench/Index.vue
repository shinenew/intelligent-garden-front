<template>
  <div class="main workBench">
    <header>
      <div class="headerCon">
        <a
          href="javascript:void(0)"
          class="icon arr"
        >&#xe626;</a>
        <h1>工作台</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="block taskLnk">
        <div class="hd">
          <h3>任务管理</h3>
        </div>
        <div class="bd">
          <div class="list">
            <router-link to="/staff/task/list?status=1">
              <b>{{unReceiveCount + receiveCount}}</b>
              <p>未完成任务</p>
            </router-link>
            <router-link to="/staff/task/list?status=9">
              <b>{{finishCount}}</b>
              <p>已完成任务</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="block dangerousLnk">
        <div class="hd">
          <h3>险情管理</h3>
        </div>
        <div class="bd">
          <div class="list">
            <router-link to="/staff/urgent/write">
              <i class="icon">&#xe623;</i>
              <p>填写应急处理</p>
            </router-link>
            <router-link to="/staff/urgent/list">
              <i class="icon">&#xe621;</i>
              <p>应急历史记录</p>
            </router-link>
          </div>
        </div>
      </div>
      <!-- <div class="block parkLnk">
        <div class="hd">
          <h3>园区管理</h3>
        </div>
        <div class="bd">
          <div class="list">
            <a href="javascript:void(0);">
              <i class="icon">&#xe61f;</i>
              <p>物品列表</p>
            </a>
            <a href="javascript:void(0);">
              <i class="icon">&#xe622;</i>
              <p>历史养护记录</p>
            </a>
            <a href="javascript:void(0);">
              <i class="icon">&#xe624;</i>
              <p>填写评价</p>
            </a>
          </div>
        </div>
      </div> -->
    </div>
    <NavComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavComponent from "@/views/components/StaffNav/Index.vue";
import { staffApi } from "@/api";
@Component({
  components: {
    NavComponent
  }
})
export default class Workbench extends Vue {
  private unReceiveCount: number = 0;
  private receiveCount: number = 0;
  private finishCount: number = 0;

  created() {
    this.getTaskCount();
  }
  /**
   * 获取订单数
   */
  async getTaskCount() {
    const res = await staffApi.getTaskDetailPageList({
      page: 1,
      pageSize: 1,
      status: 0
    });
    if (res.success && res.data) {
      this.unReceiveCount = res.data.total;
    }

    const res2 = await staffApi.getTaskDetailPageList({
      page: 1,
      pageSize: 1,
      status: 1
    });
    if (res2.success && res2.data) {
      this.receiveCount = res2.data.total;
    }

    const res3 = await staffApi.getTaskDetailPageList({
      page: 1,
      pageSize: 1,
      status: 9
    });
    if (res3.success && res3.data) {
      this.finishCount = res3.data.total;
    }
  }
}
</script>