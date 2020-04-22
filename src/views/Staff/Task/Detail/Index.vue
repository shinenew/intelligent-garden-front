<template>
  <div class="main taskDetailPage">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
        <h1>任务详情</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="form">
        <div class="corner">
          <!-- <img src="../../../../assets/img/cor-red.png" /> -->
          <img src="../../../../assets/img/cor-green.png" />
        </div>
        <label class="mod">
          <i>园区名称</i>
          <em>沙坪坝森林公园</em>
        </label>
        <label class="mod">
          <i>区域</i>
          <em>A区</em>
        </label>
        <label class="mod">
          <i>养护数量</i>
          <em>50</em>
        </label>
        <label class="mod">
          <i>计划养护时间</i>
          <em>2020-05-05</em>
        </label>
        <label class="mod">
          <i>养护内容</i>
          <em>将区域内所有的植物浇水将区域内所有的植物浇水将区域内所有的植物浇水将区域内所有的植物浇水</em>
        </label>
        <label class="mod modFull">
          <i>养护内容</i>
          <em>
            <b class="pic">
              <img src="../../../../assets/img/def-pic.png" />
            </b>
            <b class="pic">
              <img src="../../../../assets/img/def-pic.png" />
            </b>
            <b class="pic">
              <img src="../../../../assets/img/def-pic.png" />
            </b>
            <b class="pic">
              <img src="../../../../assets/img/def-pic.png" />
            </b>
            <b class="pic">
              <img src="../../../../assets/img/def-pic.png" />
            </b>
            <b class="pic">
              <img src="../../../../assets/img/def-pic.png" />
            </b>
          </em>
        </label>
      </div>
    </div>
    <footer>
      <a href="javascript:void(0);" class="btn btnBig">领取任务</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Detail extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>