<template>
  <div id="app">
    <!-- 重写alert -->
    <Alert />

    <!-- 加载中 -->
    <Loadding />

    <Confirm />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Alert from "./views/components/Alert/Index.vue";
import Loadding from "./views/components/Loadding/Index.vue";
import Confirm from "./views/components/Confirm/Index.vue";
@Component({
  components: {
    Alert,
    Loadding,
    Confirm
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
