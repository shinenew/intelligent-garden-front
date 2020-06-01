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
        v-if="taskDetail && taskDetail.status === 0 && this.role === 1"
      >
        <label class="mod">
          <i>指派给</i>
          <em
            class="gray"
            v-show="!currentStaff"
          >请选择指派养护工</em>
          <em v-show="currentStaff">已指派{{choseStaff ? choseStaff.length : 0}}人</em>
          <select v-model="currentStaff">
            <option
              style="display:none"
              value=""
              disabled
            >请选择</option>
            <option
              v-for="(staff, i) in staffList"
              :key="i"
              :value="staff.id"
            >{{staff.realName}}</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label
          class="mod"
          v-for="(staff , i) in choseStaff"
          :key="i"
        >
          <i>{{staff.realName}}</i>
          <em>
            <a
              style="color: red;text-decoration: underline;"
              @click="remove(staff.id)"
            >点击移除</a>
          </em>
        </label>
      </div>
      <div
        class="form"
        v-if="taskDetail"
      >
        <div class="corner">
          <img :src="`/img/status2-${taskDetail.status}.png`" />
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
          <i>养护类型</i>
          <em>{{taskDetail.objType === 1 ? '植物' : '建筑'}}</em>
        </label>
        <label class="mod">
          <i>养护对象</i>
          <em>{{taskDetail.objName}}</em>
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
      </div>

      <div
        class="detail-list"
        v-if="taskDetail && taskDetail.taskDetailList"
      >
        <div class="title">
          <div class="line"></div>养护记录
        </div>
        <div
          class="item"
          v-for="(d , i) in taskDetail.taskDetailList"
          :key="i"
        >
          <img :src="`/img/status3-${d.status}.png`" />
          <div class="row">
            <div class="name">{{d.staffName}}</div>
            <div class="phone">{{d.mobile}}</div>
          </div>
          <div class="row">
            <span>指派时间：</span>{{formatDate(d.createTime, 'YYYY-MM-DD HH:mm:ss')}}
          </div>
          <div class="row">
            <span>领取时间：</span>{{d.startTime ? formatDate(d.startTime, 'YYYY-MM-DD HH:mm:ss') : null}}
          </div>
          <div class="row">
            <span>完成时间：</span>{{d.finishTime ? formatDate(d.finishTime, 'YYYY-MM-DD HH:mm:ss') : null}}
          </div>
          <div
            class="row"
            v-if="d.status === 9"
          >
            <span>完成说明：</span>{{d.remark}}
          </div>
          <label
            class="mod modFull"
            v-if="d.status === 9"
          >
            <i>完成图片</i>
            <em>
              <b
                class="pic"
                v-for="(img, i ) in d.fulfillPictures"
                :key="i"
                style="position: relative;"
              >
                <img
                  :src="img.url"
                  style="width: 100%; clear: both;"
                >
              </b>
            </em>
          </label>
        </div>
      </div>
    </div>
    <footer>
      <a
        class="btn btnBig"
        @click="submit"
        v-if="taskDetail && taskDetail.status === 0 && this.role === 1"
      >提交</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import commonUtil from "@/utils/commonUtil";
import { staffApi, adminApi } from "@/api";
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
  private id: any = null;
  private taskDetail: any = null;
  private src: any = null;
  private staffList: any[] = [];
  private choseStaff: any[] = []; // 指派的员工
  private currentStaff: any = "";

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
    this.id = commonUtil.getUrlParam("id", window.location.search);
    this.src = commonUtil.getUrlParam("src", window.location.search);
    this.getDetail();
    this.getStaffList();
  }

  /**
   * 查询任务详情
   */
  async getDetail() {
    const res = await adminApi.getDetail({ id: this.id });
    if (res.success && res.data) {
      this.taskDetail = res.data;
    }
  }

  async getStaffList() {
    const res = await adminApi.getStaffList({
      page: 1,
      pageSize: 10,
      status: 1
    });
    if (res.success && res.data) {
      this.staffList = res.data.items;
    }
  }

  @Watch("currentStaff")
  private valChange(newVal: string, oldVal: string) {
    const staff = this.staffList.filter((p: any) => p.id === newVal);
    this.choseStaff.push(staff[0]);

    console.log(this.choseStaff);
  }

  remove(id: number) {
    this.choseStaff = this.choseStaff.filter((p: any) => p.id !== id);
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
      this.$router.push("/staff/taskadmin/list");
    }
  }

  async submit() {
    if (!this.choseStaff || this.choseStaff.length === 0) {
      (window as any).alert("请指派养护工");
      return;
    }

    const submitData = {
      taskId: this.taskDetail.id,
      staffIds: this.choseStaff.map((p: any) => p.id)
    };
    const res = await adminApi.assign(submitData);
    if (!res.success) {
      alert("指派失败：" + res.errMsg);
      return;
    }

    alert("指派成功");
    this.back();
  }
}
</script>