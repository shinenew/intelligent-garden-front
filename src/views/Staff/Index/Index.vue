<template>
  <div class="main staffHome">
    <header>
      <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
      <h1>首页</h1>
    </header>
    <div class="pageBox">
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
    </div>
    <footer>2</footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Index extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>