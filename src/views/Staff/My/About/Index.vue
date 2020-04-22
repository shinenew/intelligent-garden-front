<template>
  <div class="main aboutPage">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
        <h1>关于我们</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="aboutTxt">
        <p>Chongqing International Media Center is responsible for the establishment and operation of iChongqing, a multi-media information platform combining websites and apps with a strong presence on Facebook, Twitter, YouTube, LinkedIn, Instagram, Sina Weibo, Tik Tok and WeChat.</p>
        <p>Through the Internet and new media technology, the center has carried out extensive international communication cooperation, expanded the influence of Chongqing in the overseas and boosted the foreign exchanges and cooperation of Chongqing ‘s enterprises and institutions.</p>
        <p>Chongqing International Media Center is approved by the Publicity Department of Chongqing Municipal Party Committee, guided by the Information Office of Chongqing Municipal People’s Government and managed by Chongqing Daily News Group.</p>
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