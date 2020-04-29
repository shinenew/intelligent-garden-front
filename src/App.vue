<template>
  <div id="app">
    <!-- 重写alert -->
    <Alert />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Alert from "./views/components/Alert/Index.vue";
@Component({
  components: {
    Alert
  }
})
export default class App extends Vue {}
</script>

<style>
</style>
