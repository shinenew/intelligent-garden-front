<template>
  <div class="main processPage">
    <header>
      <div class="headerCon">
        <a
          href="javascript:void(0)"
          class="icon arr"
          @click="back"
        >&#xe626;</a>
        <h1>完成任务</h1>
      </div>
    </header>
    <div
      class="pageBox"
      v-if="taskDetail"
    >
      <div class="form">
        <label class="mod">
          <i>园区名称</i>
          <em>{{taskDetail.zoneName}}</em>
        </label>
        <label class="mod">
          <i>区域</i>
          <em>{{taskDetail.logicArea}}</em>
        </label>
        <label class="mod">
          <i>{{taskDetail.objType === 1 ? '植物' : '建筑'}}名称</i>
          <em>{{taskDetail.objName}}</em>
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
          <i>完成情况</i>
          <input
            type="text"
            placeholder="请填写完成情况"
            class="text"
            v-model="remark"
          />
        </label>
        <label class="mod modFull">
          <i>上传图片</i>
          <em>
            <span
              class="uploadPic"
              v-for="n in uploadImgCount"
              :key="n"
            >
              <a
                href="javascript:void(0)"
                v-if="uploadedImgs && uploadedImgs.length >= n"
              >
                <img :src="uploadedImgs[n - 1].url" />
              </a>
              <a
                href="javascript:void(0)"
                class="upContrl"
                v-else
              ></a>
            </span>
          </em>
        </label>
      </div>
    </div>
    <footer>
      <a
        href="javascript:void(0);"
        class="btn btnBig"
        @click="submit"
      >提交</a>
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
export default class Process extends Vue {
  private id: any = null;
  private src: any = null;
  private taskDetail: any = null;
  private uploadImgCount: number = 3;
  private uploadedImgs: any[] = [
    {
      name: "养护现场图片1",
      url:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588191344538&di=66e0f8011f082c39690a3665660138dc&imgtype=0&src=http%3A%2F%2Fwww.hbghdd.com%2Fuploads%2Fallimg%2F161102%2F1-161102093UK35.jpg"
    }
  ]; // 已上传图片
  private remark: string | null = null;

  created() {
    this.id = commonUtil.getUrlParam("id", window.location.search);
    this.src = commonUtil.getUrlParam("src", window.location.search);
    this.getDetail();
  }

  back() {
    if (this.src) {
      window.location.href = this.src;
    } else {
      this.$router.push("/staff/task/list");
    }
  }

  /**
   * 查询任务详情
   */
  async getDetail() {
    const res = await staffApi.getTaskDetailDetail({ taskDetailId: this.id });
    if (res.success && res.data) {
      this.taskDetail = res.data;
      if (!this.taskDetail || this.taskDetail.status !== 1) {
        this.$router.push("/staff");
      }
    }
  }

  /**
   * 完成任务
   */
  async submit() {
    if (!this.remark) {
      alert("请填写完成情况");
      return;
    }

    if (!this.uploadedImgs || this.uploadedImgs.length === 0) {
      alert("请至少上传一张现场图片");
      return;
    }

    const res = await staffApi.finishTask({
      taskDetailId: this.id,
      remark: this.remark,
      fulfillPictures: this.uploadedImgs
    });
    if (!res.success) {
      alert("完成任务失败：" + res.errMsg);
      return;
    }

    alert("完成任务成功");
    const self = this;
    setTimeout(function() {
      self.back();
    }, 2000);
  }
}
</script>