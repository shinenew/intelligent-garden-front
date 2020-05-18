<template>
  <div class="main urgWritePage">
    <header>
      <div class="headerCon">
        <router-link
          to="/staff/workbench"
          class="icon arr"
        >&#xe626;</router-link>
        <h1>新增养护计划</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="form">
        <label class="mod">
          <i>园区</i>
          <em
            class="gray"
            v-show="!taskData.zoneId"
          >请选择园区</em>
          <em v-show="taskData.zoneId">{{getZoneName(taskData.zoneId)}}</em>
          <select v-model="taskData.zoneId">
            <option
              v-for="(zone, i) in zoneList"
              :key="i"
              :value="zone.id"
            >{{zone.name}}</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>区域</i>
          <input
            type="text"
            placeholder="请填写区域"
            class="text"
            v-model="taskData.logicArea"
          />
        </label>
        <label class="mod">
          <i>养护类型</i>
          <em
            class="gray"
            v-show="!taskData.objType"
          >请选择养护类型</em>
          <em v-show="taskData.objType">{{getObjTypeName(taskData.objType)}}</em>
          <select
            v-model="taskData.objType"
            @change="changeObjType"
          >
            <option :value="1">植物</option>
            <option :value="2">建筑</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label
          class="mod"
          v-show="taskData.objType"
        >
          <i v-show="taskData.objType === 1">植物</i>
          <i v-show="taskData.objType === 2">建筑</i>
          <em
            class="gray"
            v-show="!taskData.objId"
          >请选择养护对象</em>
          <em v-show="taskData.objId">{{getObjName()}}</em>
          <select v-model="taskData.objId">
            <option
              :value="obj.id"
              v-for="(obj,i) in objList"
              :key="i"
            >{{obj.objName}}</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>计划时间开始</i>
          <input
            type="date"
            placeholder="请选择计划时间开始"
            class="text"
            v-model="taskData.startDate"
          />
        </label>
        <label class="mod">
          <i>计划时间结束</i>
          <input
            type="date"
            placeholder="请选择计划时间结束"
            class="text"
            v-model="taskData.endDate"
          />
        </label>
        <label class="mod">
          <i>每天养护</i>
          <em
            class="gray"
            v-show="!taskData.everyDay"
          >请选择是否每天养护</em>
          <em v-show="taskData.everyDay">{{taskData.everyDay ? '是' : '否'}}</em>
          <select v-model="taskData.everyDay">
            <option :value="true">是</option>
            <option :value="false">否</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>养护内容</i>
          <input
            type="text"
            placeholder="请填写养护内容"
            class="text"
            v-model="taskData.content"
          />
        </label>
        <label class="mod">
          <i>养护说明</i>
          <input
            type="text"
            placeholder="请填写养护说明"
            class="text"
            v-model="taskData.intro"
          />
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
import { urgentApi, zoneApi, baseinfoApi, adminApi } from "@/api";
import moment from "moment";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Write extends Vue {
  private taskData: {
    zoneId: any;
    logicArea: any;
    objType: any;
    objId: any;
    startDate: any;
    endDate: any;
    everyDay: any;
    content: any;
    intro: any;
  } = {
    zoneId: null,
    logicArea: null,
    objType: null,
    objId: null,
    startDate: null,
    endDate: null,
    everyDay: null,
    content: null,
    intro: null
  }; // 提交数据
  private selectedObjType: any = null; // 选择的类别
  private plantAndBuildList: any[] = []; // 紧急对象列表
  private objList: any[] = []; // 应急对象
  private zoneList: any[] = [];

  created() {
    this.getZoneList();
    this.getObjList();
  }

  /**
   * 获取园区列表
   */
  async getZoneList() {
    const res = await adminApi.getLoginUserZoneList();
    if (res.success && res.data) {
      this.zoneList = res.data;
    }
  }

  getZoneName(id: number) {
    // console.log(id);
    if (id) {
      return this.zoneList.filter((p: any) => p.id === id)[0].name;
    }
    return null;
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
      (p: any) => p.objType == this.taskData.objType
    );
  }

  /**
   * 获取对象名称
   */
  getObjName() {
    if (this.objList && this.taskData.objId) {
      return this.objList.filter((p: any) => p.id === this.taskData.objId)[0]
        .objName;
    }

    return null;
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

  async submit() {
    if (!this.taskData.zoneId) {
      (window as any).alert("请选择园区");
      return;
    }

    if (!this.taskData.objType) {
      (window as any).alert("请选择养护类型");
      return;
    }

    if (!this.taskData.objId) {
      (window as any).alert("请选择养护对象");
      return;
    }

    if (!this.taskData.startDate) {
      (window as any).alert("请选择开始时间");
      return;
    }

    if (!this.taskData.endDate) {
      (window as any).alert("请选择结束时间");
      return;
    }

    if (!this.taskData.content) {
      (window as any).alert("请填写养护内容");
      return;
    }

    if (!this.taskData.intro) {
      (window as any).alert("请填写养护说明");
      return;
    }

    if (this.taskData.startDate > this.taskData.endDate) {
      (window as any).alert("计划开始时间不能大于结束时间");
      return;
    }

    const submitData = this.taskData;

    if (this.taskData.everyDay) {
      // 获取时间间隔
      const days = moment(submitData.endDate).diff(this.taskData.startDate, "d");
      let startDate = moment(submitData.startDate);
      for (let i = 0; i <= days; i++) {
        const start = startDate;
        submitData.startDate = start.valueOf();
        const end = start.valueOf();
        submitData.endDate = end.valueOf();
        startDate.add(1, "days");
        const res = await adminApi.addTask(submitData);
        if (!res.success) {
          alert("新增失败：" + res.errMsg);
          return;
        }
      }

      alert("新增养护任务成功");
      this.$router.push("/staff/taskadmin/list");
    } else {
      submitData.startDate = moment(this.taskData.startDate).valueOf();
      submitData.endDate = moment(this.taskData.endDate).valueOf();
      const res = await adminApi.addTask(submitData);
      if (!res.success) {
        alert("新增失败：" + res.errMsg);
        return;
      }

      alert("新增养护任务成功");
      this.$router.push("/staff/taskadmin/list");
    }

    // const res = await urgentApi.write(this.taskData);
    // if (!res.success) {
    //   (window as any).alert("填写应急情况失败：" + res.errMsg);
    //   return;
    // }

    // (window as any).alert("填写应急情况成功");
    // const self = this;
    // setTimeout(function() {
    //   self.$router.push("/staff/workbench");
    // }, 1000);
  }
}
</script>