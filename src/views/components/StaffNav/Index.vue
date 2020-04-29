<template>
  <nav>
    <router-link
      to="/staff"
      :class="this.currentPath === '/staff' ? 'cu' : ''"
    >
      <i class="icon">&#xe620;</i>
      <p>首页</p>
    </router-link>
    <router-link
      to="/staff/workbench"
      :class="this.currentPath === '/staff/workbench' ? 'cu' : ''"
    >
      <i class="icon">&#xe61d;</i>
      <p>工作台</p>
    </router-link>
    <router-link
      to="/staff/my"
      :class="this.currentPath === '/staff/my' ? 'cu' : ''"
    >
      <i class="icon">&#xe61c;</i>
      <p>我的</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

/**
 * 全屏提示
 */
@Component
export default class StaffNav extends Vue {
  /**
   * 获取当前路由
   */
  get currentPath() {
    return this.$router && this.$router.currentRoute
      ? this.$router.currentRoute.path
      : "";
  }
}
</script>

<style>
</style>
