<template>
  <div class="main urgViewPage">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
        <h1>应急处理</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="form">
        <div class="tit">应急批复：物理及化学除虫杀菌</div>
        <label class="mod">
          <i>园区：</i>
          <em>沙坪坝公园</em>
        </label>
        <label class="mod">
          <i>植物/建筑名称：</i>
          <em>樟树</em>
        </label>
        <label class="mod">
          <i>应急分类：</i>
          <em>大自然虫害</em>
        </label>
        <label class="mod">
          <i>应急情况说明：</i>
          <em>
            情况非常非常严重！情况非常非常严重！情况非常非常严重！情况非常非常严重！
            <img src="../../../../assets/img/def-pic.png" />
          </em>
        </label>
        <label class="mod">
          <i>处理进度：</i>
          <em>未处理</em>
        </label>
        <label class="mod">
          <i>处理情况说明：</i>
          <em>已经紧急处理。</em>
        </label>
        <label class="mod modFull">
          <i>处理后的效果图</i>
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
            <span class="uploadPic">
              <a href="javascript:void(0)" class="upContrl"></a>
            </span>
          </em>
        </label>
      </div>
    </div>
    <footer>
      <a href="javascript:void(0);" class="btn btnBig">已完成应急处理</a>
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