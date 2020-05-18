<template>
  <div class="main urgViewPage">
    <header>
      <div class="headerCon">
        <a
          href="javascript:void(0)"
          class="icon arr"
          @click="back"
        >&#xe626;</a>
        <h1>应急流程详情</h1>
      </div>
    </header>
    <div
      class="pageBox"
      v-if="detail"
    >
      <!-- 待审核 -->
      <div
        class="form"
        v-if="this.role === 1 && detail.status === 0"
      >
        <label class="mod">
          <i>审核</i>
          <em
            class="gray"
            v-show="!auditData.oper"
          >请选择审核方式</em>
          <em v-show="auditData.oper">{{auditData.oper === 'pass' ? '审核通过' : '驳回'}}</em>
          <select v-model="auditData.oper">
            <option value="pass">审核通过</option>
            <option value="refuse">驳回</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>审核意见</i>
          <input
            type="text"
            placeholder="请填写审核意见"
            class="text"
            v-model="auditData.remark"
          />
        </label>
      </div>

      <!-- 待批示 -->
      <div
        class="form"
        v-if="this.role === 2 && detail.status === 2"
      >
        <label class="mod">
          <i>批示意见</i>
          <input
            type="text"
            placeholder="请填写批示意见"
            class="text"
            v-model="auditData.remark"
          />
        </label>
      </div>

      <!-- 待处理 -->
      <div
        class="form"
        v-if="this.role === 1 && detail.status === 3"
      >
        <label class="mod">
          <i>处理方案</i>
          <input
            type="text"
            placeholder="请填写处理方案"
            class="text"
            v-model="auditData.remark"
          />
        </label>
        <label class="mod">
          <i>处理图片</i>
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
    <footer v-if="detail && ((this.role === 1 && (detail.status === 0 || detail.status === 3)) || (this.role === 2 && detail.status === 2))">
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
import { urgentApi, adminApi, baseinfoApi } from "@/api";
import IUserInfo from "@/constant/DataModel/IUserInfo";
import { Getter, namespace } from "vuex-class";
import moment from "moment";
const userModule = namespace("user");

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Detail extends Vue {
  private src: any = null;
  private id: any = null;
  private detail: any = null;

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

  /**
   * 审核数据
   */
  private auditData: {
    oper: string;
    remark: string;
  } = {
    oper: "",
    remark: ""
  };

  /**
   * 待提交的图片地址
   */
  private uploadImgs: any[] = [];

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
      case 2:
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
    const submitData: any = {
      urgentId: this.detail.id,
      remark: this.auditData.remark
    };
    if (this.detail.status === 0) {
      if (!this.auditData.oper) {
        alert("请选择审核方式");
        return;
      }
      if (!this.auditData.remark) {
        alert("请填写审核意见");
        return;
      }

      // const res = await adminApi.handleUrgent(this.auditData);
      // if (!res.success) {
      //   alert("审核失败：" + res.errMsg);
      //   return;
      // }
      let res;
      switch (this.auditData.oper) {
        case "pass": // 审核通过
          submitData.status = 2;
          res = await adminApi.handleUrgent(submitData);
          if (!res.success) {
            alert("审核通过失败：" + res.errMsg);
            return;
          }

          alert("审核通过成功");
          this.$router.push("/staff/urgent/list");
          break;
        case "refuse": // 审核拒绝
          submitData.status = -1;
          res = await adminApi.handleUrgent(submitData);
          if (!res.success) {
            alert("驳回失败：" + res.errMsg);
            return;
          }

          alert("驳回成功");
          this.$router.push("/staff/urgent/list");
          break;
        default:
          break;
      }
    } else if (this.detail.status === 2) {
      if (!this.auditData.remark) {
        alert("请填写批示意见");
        return;
      }
      submitData.status = 3;
      const res = await adminApi.handleUrgent(submitData);
      if (!res.success) {
        alert("批示失败：" + res.errMsg);
        return;
      }

      alert("批示成功");
      this.$router.push("/staff/urgent/list");
    } else if (this.detail.status === 3) {
      if (!this.auditData.remark) {
        alert("请填写处理方案");
        return;
      }

      if (!this.uploadImgs || this.uploadImgs.length === 0) {
        (window as any).alert("请上传处理图片");
        return;
      }

      submitData.status = 9;
      submitData.handlePictures = this.uploadImgs;
      const res = await adminApi.handleUrgent(submitData);
      if (!res.success) {
        alert("处理失败：" + res.errMsg);
        return;
      }

      alert("处理成功");
      this.back();
    }
  }
}
</script>