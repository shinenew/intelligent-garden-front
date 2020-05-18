<template>
  <div class="main workBench">
    <header>
      <div class="headerCon">
        <!-- <a
          href="javascript:void(0)"
          class="icon arr"
        >&#xe626;</a> -->
        <h1>工作台</h1>
      </div>
    </header>
    <div
      class="pageBox"
      v-if="this.role === 3"
    >
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
    </div>

    <div
      class="pageBox"
      v-else
    >
      <div class="block taskLnk">
        <div class="hd">
          <h3>应急流程</h3>
        </div>
        <div class="bd">
          <div class="list">
            <router-link
              to="/staff/urgent/list?status=0"
              v-if="this.role !== 2"
            >
              <b>{{urgentWaitApprove}}</b>
              <p>待审核</p>
            </router-link>
            <router-link
              to="/staff/urgent/list?status=2"
              v-if="this.role !== 1"
            >
              <b>{{urgentWaitWritten}}</b>
              <p>待批示</p>
            </router-link>
            <router-link
              to="/staff/urgent/list?status=3"
              v-if="this.role !== 2"
            >
              <b>{{urgentWaitProcess}}</b>
              <p>待处理</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="block dangerousLnk">
        <div class="hd">
          <h3>养护计划</h3>
        </div>
        <div class="bd">
          <div class="list">
            <router-link
              to="/staff/taskadmin/add"
              v-if="this.role === 1"
            >
              <i class="icon">&#xe623;</i>
              <p>添加</p>
            </router-link>
            <router-link
              to="/staff/taskadmin/list?status=0"
              class="assign"
              v-if="this.role === 1"
              style="position: relative;"
            >
              <img
                src='/img/assign.png'
                style="width:.7rem; height:.7rem;position: absolute;top: -.85rem;left:.74rem"
              />
              <p>指派</p>
            </router-link>
            <router-link to="/staff/taskadmin/list?status=1">
              <i class="icon">&#xe621;</i>
              <p>查询</p>
            </router-link>
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
import IUserInfo from "@/constant/DataModel/IUserInfo";
import { Getter, namespace } from "vuex-class";
import { staffApi, adminApi } from "@/api";
const userModule = namespace("user");

@Component({
  components: {
    NavComponent
  }
})
export default class Workbench extends Vue {
  private unReceiveCount: number = 0;
  private receiveCount: number = 0;
  private finishCount: number = 0;

  private urgentWaitApprove: number = 0; // 应急待审核数0
  private urgentWaitWritten: number = 0; // 应急待批示2
  private urgentWaitProcess: number = 0; // 应急待处理3

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

  created() {
    this.getTaskCount();
  }
  /**
   * 获取订单数
   */
  async getTaskCount() {
    if (this.role === 3) {
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
    } else if (this.role === 1) {
      const res = await adminApi.getUrgentPageList({
        status: 0,
        page: 1,
        pageSize: 1
      });
      if (res.success && res.data) {
        this.urgentWaitApprove = res.data.total;
      }

      const res2 = await adminApi.getUrgentPageList({
        status: 3,
        page: 1,
        pageSize: 1
      });
      if (res2.success && res2.data) {
        this.urgentWaitProcess = res2.data.total;
      }
    } else if (this.role === 2) {
      const res = await adminApi.getUrgentPageList({
        status: 2,
        page: 1,
        pageSize: 1
      });
      if (res.success && res.data) {
        this.urgentWaitWritten = res.data.total;
      }
    } else {
      const res = await adminApi.getUrgentPageList({
        status: 0,
        page: 1,
        pageSize: 1
      });
      if (res.success && res.data) {
        this.urgentWaitApprove = res.data.total;
      }

      const res2 = await adminApi.getUrgentPageList({
        status: 3,
        page: 1,
        pageSize: 1
      });
      if (res2.success && res2.data) {
        this.urgentWaitProcess = res2.data.total;
      }

      const res3 = await adminApi.getUrgentPageList({
        status: 2,
        page: 1,
        pageSize: 1
      });
      if (res3.success && res3.data) {
        this.urgentWaitWritten = res3.data.total;
      }
    }
  }
}
</script>