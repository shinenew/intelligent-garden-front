<template>
  <div class="main urgWritePage">
    <header>
      <div class="headerCon">
        <router-link
          to="/staff/workbench"
          class="icon arr"
        >&#xe626;</router-link>
        <h1>填写应急处理</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="form">
        <label class="mod">
          <i>应急分类</i>
          <em
            class="gray"
            v-show="!urgentData.category"
          >请选择应急分类</em>
          <em v-show="urgentData.category">{{getCategoryName(urgentData.category)}}</em>
          <select v-model="urgentData.category">
            <option :value="1">自然灾害</option>
            <option :value="2">人为破坏</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>险情等级</i>
          <em
            class="gray"
            v-show="!urgentData.level"
          >请选择险情等级</em>
          <em v-show="urgentData.level">{{getLevelName(urgentData.level)}}</em>
          <select v-model="urgentData.level">
            <option :value="1">一般</option>
            <option :value="2">紧急</option>
            <option :value="3">特别紧急</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>类别</i>
          <em
            class="gray"
            v-show="!urgentData.objType"
          >请选择类别</em>
          <em v-show="urgentData.objType">{{getObjTypeName(urgentData.objType)}}</em>
          <select
            v-model="urgentData.objType"
            @change="changeObjType"
          >
            <option :value="1">植物</option>
            <option :value="2">建筑</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label
          class="mod"
          v-show="urgentData.objType"
        >
          <i v-show="urgentData.objType === 1">植物</i>
          <i v-show="urgentData.objType === 2">建筑</i>
          <em
            class="gray"
            v-show="!urgentData.objId"
          >请选择对象</em>
          <em v-show="urgentData.objId">{{getObjName()}}</em>
          <select v-model="urgentData.objId">
            <option
              :value="obj.id"
              v-for="(obj,i) in objList"
              :key="i"
            >{{obj.objName}}</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>应急情况</i>
          <input
            type="text"
            placeholder="请填写应急情况"
            class="text"
            v-model="urgentData.intro"
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
import { urgentApi, zoneApi, baseinfoApi } from "@/api";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Write extends Vue {
  private urgentData: {
    category: any;
    level: any;
    objType: any;
    objId: any;
    intro: any;
    scenePictures: any[];
  } = {
    category: null,
    level: null,
    objType: null,
    objId: null,
    intro: null,
    scenePictures: []
  }; // 提交数据
  private selectedObjType: any = null; // 选择的类别
  private plantAndBuildList: any[] = []; // 紧急对象列表
  private objList: any[] = []; // 应急对象

  created() {
    this.getObjList();
  }

  /**
   * 获取园区下的植物/建筑列表
   */
  async getObjList() {
    const res = await zoneApi.getObjList({
      page: 1,
      pageSize: 100
    });
    if (res.success && res.data) {
      this.plantAndBuildList = res.data.items;
    }
  }

  /**
   * 改变类别
   */
  changeObjType() {
    this.objList = this.plantAndBuildList.filter(
      (p: any) => p.objType == this.urgentData.objType
    );
  }

  /**
   * 获取对象名称
   */
  getObjName() {
    if (this.objList && this.urgentData.objId) {
      return this.objList.filter((p: any) => p.id === this.urgentData.objId)[0]
        .objName;
    }

    return null;
  }

  /**
   * 获取分类名称
   */
  private getCategoryName(val: number) {
    switch (val) {
      case 1:
        return "自然灾害";
      case 2:
        return "人为破坏";
      default:
        return "未知";
    }
  }

  /**
   * 获取级别名称
   */
  private getLevelName(val: number) {
    switch (val) {
      case 1:
        return "一般";
      case 2:
        return "紧急";
      case 3:
        return "特别紧急";
      default:
        return "未知";
    }
  }

  /**
   * 获取养护类型名称
   */
  private getObjTypeName(val: number) {
    switch (val) {
      case 1:
        return "植物";
      case 2:
        return "建筑";
      default:
        return "未知";
    }
  }

  /**
   * 待提交的图片地址
   */
  private uploadImgs: any[] = [];

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

  async submit() {
    if (!this.urgentData.category) {
      (window as any).alert("请选择应急分类");
      return;
    }
    if (!this.urgentData.level) {
      (window as any).alert("请选择险情等级");
      return;
    }
    if (!this.urgentData.objType) {
      (window as any).alert("请选择类别");
      return;
    }
    if (!this.urgentData.category) {
      (window as any).alert("请选择应急对象");
      return;
    }
    if (!this.urgentData.intro) {
      (window as any).alert("请填写应急情况");
      return;
    }
    if (!this.uploadImgs || this.uploadImgs.length === 0) {
      (window as any).alert("请上传现场图片");
      return;
    }

    this.urgentData.scenePictures = this.uploadImgs;

    const res = await urgentApi.write(this.urgentData);
    if (!res.success) {
      (window as any).alert("填写应急情况失败：" + res.errMsg);
      return;
    }

    (window as any).alert("填写应急情况成功");
    const self = this;
    setTimeout(function() {
      self.$router.push("/staff/workbench");
    }, 1000);
  }
}
</script>