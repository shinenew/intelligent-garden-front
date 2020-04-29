<template>
  <div class="main taskDetailPage">
    <header>
      <div class="headerCon">
        <a
          href="javascript:void(0)"
          class="icon arr"
          @click="back"
        >&#xe626;</a>
        <h1>任务详情</h1>
      </div>
    </header>
    <div class="pageBox">
      <div
        class="form"
        v-if="taskDetail"
      >
        <div class="corner">
          <img :src="`/img/${getStatusImg(taskDetail.status)}`" />
        </div>
        <label class="mod">
          <i>园区名称</i>
          <em>{{taskDetail.zoneName}}</em>
        </label>
        <label class="mod">
          <i>区域</i>
          <em>{{taskDetail.logicArea}}</em>
        </label>
        <label class="mod">
          <i>计划养护时间</i>
          <em>{{getTaskDate(taskDetail.startDate , taskDetail.endDate)}}</em>
        </label>
        <label class="mod">
          <i>养护内容</i>
          <em>{{taskDetail.content}}</em>
        </label>
        <label class="mod">
          <i>养护说明</i>
          <em>{{taskDetail.intro}}</em>
        </label>
        <label class="mod">
          <i>指派时间</i>
          <em>{{formatDate(taskDetail.createTime, "YYYY-MM-DD HH:mm:ss")}}</em>
        </label>
        <label
          class="mod"
          v-if="taskDetail.startTime"
        >
          <i>领取时间</i>
          <em>{{formatDate(taskDetail.startTime, "YYYY-MM-DD HH:mm:ss")}}</em>
        </label>
        <label
          class="mod"
          v-if="taskDetail.finishTime"
        >
          <i>完成时间</i>
          <em>{{formatDate(taskDetail.finishTime, "YYYY-MM-DD HH:mm:ss")}}</em>
        </label>
        <label
          class="mod"
          v-if="taskDetail.status === 9"
        >
          <i>完成说明</i>
          <em>{{taskDetail.remark}}</em>
        </label>
        <label
          class="mod modFull"
          v-if="taskDetail.status === 9 && taskDetail.fulfillPictures && taskDetail.fulfillPictures.length > 0"
        >
          <i>完成图片</i>
          <em>
            <b
              class="pic"
              v-for="(pic, i) in taskDetail.fulfillPictures"
              :key="i"
            >
              <img :src="pic.url" />
            </b>
          </em>
        </label>
      </div>
    </div>
    <footer>
      <a
        href="javascript:void(0);"
        class="btn btnBig"
        v-if="taskDetail && taskDetail.status === 0"
      >领取任务</a>
      <router-link
        :to="`/staff/task/process?id=${taskDetail.id}`"
        class="btn btnBig"
        v-if="taskDetail && taskDetail.status === 1"
      >完成任务</router-link>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import commonUtil from "@/utils/commonUtil";
import { staffApi } from "@/api";
import moment from "moment";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Detail extends Vue {
  private id: any = null;
  private taskDetail: any = null;
  private src: any = null;
  created() {
    this.id = commonUtil.getUrlParam("id", window.location.search);
    this.src = commonUtil.getUrlParam("src", window.location.search);
    this.getDetail();
  }

  /**
   * 查询任务详情
   */
  async getDetail() {
    const res = await staffApi.getTaskDetailDetail({ taskDetailId: this.id });
    if (res.success && res.data) {
      this.taskDetail = res.data;
    }
  }

  /**
   * 获取状态图片
   */
  getStatusImg(status: number) {
    switch (status) {
      case 9:
        return "cor-green.png";
      case 0:
        return "urg-cor-red.png";
      case 1:
        return "cor-red.png";
      default:
        return "";
    }
  }

  /**
   * 获取任务日期
   */
  getTaskDate(startDate: number, endDate: number) {
    if (startDate === endDate) {
      return this.formatDate(startDate, "YYYY-MM-DD");
    } else {
      return `${this.formatDate(startDate, "YYYY-MM-DD")} ~ ${this.formatDate(
        endDate,
        "YYYY-MM-DD"
      )}`;
    }
  }

  /**
   * 格式化日期
   */
  formatDate(val: number, format: string = "YYYY-MM-DD") {
    return moment(val).format(format);
  }

  back() {
    if (this.src) {
      window.location.href = this.src;
    } else {
      this.$router.push("/staff/task/list");
    }
  }
}
</script>