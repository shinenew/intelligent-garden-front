<template>
  <div id="app">
    <!-- 重写alert -->
    <Alert />

    <!-- 加载中 -->
    <Loadding />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Alert from "./views/components/Alert/Index.vue";
import Loadding from "./views/components/Loadding/Index.vue";
@Component({
  components: {
    Alert,
    Loadding
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
