<template>
  <div id="app">
    <!-- 重写alert -->
    <Alert />

    <!-- 加载中 -->
    <Loadding />

    <!-- 微信jssdk -->
    <WxJsSdk />

    <Confirm />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Alert from "./views/components/Alert/Index.vue";
import Loadding from "./views/components/Loadding/Index.vue";
import Confirm from "./views/components/Confirm/Index.vue";
import WxJsSdk from "./views/components/WxJsSdk/Index.vue";
@Component({
  components: {
    Alert,
    Loadding,
    Confirm,
    WxJsSdk
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
