<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0px;
}
* {
  box-sizing: border-box;
}
a {
  color: #1890ff;
  background-color: initial;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
}
</style>
