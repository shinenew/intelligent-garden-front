<template>
  <div class="main aboutPage">
    <header>
      <div class="headerCon">
        <router-link
          to="/staff/my"
          class="icon arr"
        >&#xe626;</router-link>
        <h1>关于我们</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="aboutTxt">
        <p>慧园林管理系统是一套高、大、上的管理系统</p>
        <p>系统在手，管理无忧</p>
        <p>快来加入我们吧</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class About extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>