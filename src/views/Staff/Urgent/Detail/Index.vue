<template>
  <div class="main urgViewPage">
    <header>
      <div class="headerCon">
        <a
          href="javascript:void(0)"
          class="icon arr"
          @click="back"
        >&#xe626;</a>
        <h1>应急处理</h1>
      </div>
    </header>
    <div
      class="pageBox"
      v-if="detail"
    >
      <div class="form">
        <!-- <div class="tit">应急批复：物理及化学除虫杀菌</div> -->
        <label class="mod">
          <i>园区：</i>
          <em>{{detail.zoneName}}</em>
        </label>
        <label class="mod">
          <i>植物/建筑名称：</i>
          <em>{{detail.objName}}</em>
        </label>
        <label class="mod">
          <i>应急分类：</i>
          <em>{{detail.category === 1 ? '自然灾害' : '人为破坏'}}</em>
        </label>
        <label class="mod">
          <i>应急情况说明：</i>
          <em>
            {{detail.intro}}
          </em>
        </label>
        <label class="mod modFull">
          <i>现场图片</i>
          <em>
            <b
              class="pic"
              v-for="(img, i) in detail.scenePictures"
              :key="i"
            >
              <img :src="img.url" />
            </b>
          </em>
        </label>
        <label class="mod">
          <i>处理状态：</i>
          <em>{{getStatusName(detail.status)}}</em>
        </label>
        <label
          class="mod"
          v-if="detail.solution"
        >
          <i>处理情况说明：</i>
          <em>{{detail.solution}}</em>
        </label>
        <label
          class="mod modFull"
          v-if="detail.solution"
        >
          <i>处理图片</i>
          <em>
            <b
              class="pic"
              v-for="(img, i) in detail.handlePictures"
              :key="i"
            >
              <img :src="img.url" />
            </b>
          </em>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import commonUtil from "@/utils/commonUtil";
import { urgentApi } from "@/api";
import moment from "moment";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Detail extends Vue {
  private src: any = null;
  private id: any = null;
  private detail: any = null;

  created() {
    this.id = commonUtil.getUrlParam("id", window.location.search);
    this.src = commonUtil.getUrlParam("src", window.location.search);
    this.getDetail();
  }

  /**
   * 查询任务详情
   */
  async getDetail() {
    const res = await urgentApi.getDetail({
      urgentId: this.id
    });

    if (res.success) {
      this.detail = res.data;
    }
  }

  getStatusName(status: number) {
    switch (status) {
      case 0:
        return "待审核";
      case 1:
        return "待批示";
      case 3:
        return "待处理";
      case 9:
        return "已完成";
      case -1:
        return "已驳回";
      default:
        return null;
    }
  }

  back() {
    if (this.src) {
      window.location.href = this.src;
    } else {
      this.$router.push("/staff/urgent/list");
    }
  }
}
</script>