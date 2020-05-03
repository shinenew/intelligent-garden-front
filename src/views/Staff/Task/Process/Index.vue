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
        <label class="mod">
          <i>现场图片</i>
          <em>&nbsp;</em>
        </label>
        <label class="mod modFull">
          <em>
            <span class="uploadPic">
              <a
                href="javascript:void(0)"
                class="upContrl"
                @click="clickFile"
              >
                <input
                  type="file"
                  style="display: none"
                  id="upload-input"
                  @change="fileChange"
                /></a>
            </span>
          </em>
        </label>
        <label class="mod modFull">
          <i><a
              style="color: red;text-decoration: underline;"
              v-show="this.uploadImgs && this.uploadImgs.length > 0"
              @click="clear"
            >清空重传</a></i>
          <em>
            <b
              class="pic"
              v-for="(img, i) in uploadImgs"
              :key="i"
            >
              <img :src="img.url" />
            </b>
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
import { staffApi, baseinfoApi } from "@/api";
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
  private uploadImgs: any[] = []; // 已上传图片
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
   * 点击上传
   */
  private clickFile() {
    const ele = document.getElementById("upload-input");
    if (ele) {
      ele.click();
    }
  }

  /**
   * 选中上传文件
   */
  private async fileChange(e: any) {
    // console.log(this.uploadImgs.length);
    if (this.uploadImgs && this.uploadImgs.length >= 3) {
      (window as any).alert("最多只能上传3张图片");
      return;
    }
    // console.log(e);
    (window as any).loadding("图片上传中");
    let uploadData = new FormData();
    uploadData.append("file", e.target.files[0]);
    uploadData.append("dir", "images");

    // /fastdfs/upload-file
    // multipart/form-data
    const res = await baseinfoApi.upload(uploadData);
    if (res.success && res.data) {
      // this.config.imgUrl
      this.uploadImgs.push(res.data);
    }
    (window as any).closeLoadding();
  }

  /**
   * 清空图片
   */
  private clear() {
    this.uploadImgs = [];
  }

  /**
   * 完成任务
   */
  async submit() {
    if (!this.remark) {
      alert("请填写完成情况");
      return;
    }

    if (!this.uploadImgs || this.uploadImgs.length === 0) {
      alert("请至少上传一张现场图片");
      return;
    }

    const res = await staffApi.finishTask({
      taskDetailId: this.id,
      remark: this.remark,
      fulfillPictures: this.uploadImgs
    });
    if (!res.success) {
      alert("完成任务失败：" + res.errMsg);
      return;
    }

    alert("完成任务成功");
    const self = this;
    setTimeout(function() {
      self.back();
    }, 1000);
  }
}
</script>