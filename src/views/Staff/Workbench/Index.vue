<template>
  <div class="main workBench">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
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
            <a href="javascript:void(0);">
              <b>52</b>
              <p>未完成任务</p>
            </a>
            <a href="javascript:void(0);">
              <b>52</b>
              <p>已完成任务</p>
            </a>
          </div>
        </div>
      </div>
      <div class="block dangerousLnk">
        <div class="hd">
          <h3>险情管理</h3>
        </div>
        <div class="bd">
          <div class="list">
            <a href="javascript:void(0);">
              <i class="icon">&#xe623;</i>
              <p>填写应急处理</p>
            </a>
            <a href="javascript:void(0);">
              <i class="icon">&#xe621;</i>
              <p>应急历史记录</p>
            </a>
          </div>
        </div>
      </div>
      <div class="block parkLnk">
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
      </div>
    </div>
    <nav>
      <a href="javascript:void(0);">
        <i class="icon">&#xe620;</i>
        <p>首页</p>
      </a>
      <a href="javascript:void(0);" class="cu">
        <i class="icon">&#xe61d;</i>
        <p>工作台</p>
      </a>
      <a href="javascript:void(0);">
        <i class="icon">&#xe61c;</i>
        <p>我的</p>
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Workbench extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>