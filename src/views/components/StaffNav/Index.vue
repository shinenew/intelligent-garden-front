<template>
  <nav>
    <router-link
      to="/staff"
      :class="this.currentPath === '/staff' ? 'cu' : ''"
      v-if="this.role === 3"
    >
      <i class="icon">&#xe620;</i>
      <p>首页</p>
    </router-link>
    <router-link
      to="/staff/workbench"
      :class="this.currentPath === '/staff/workbench' ? (this.role === 3 ? 'cu' : 'cu two') : (this.role === 3 ? '' : 'two')"
    >
      <i class="icon">&#xe61d;</i>
      <p>工作台</p>
    </router-link>
    <router-link
      to="/staff/my"
      :class="this.currentPath === '/staff/my' ? (this.role === 3 ? 'cu' : 'cu two') : (this.role === 3 ? '' : 'two')"
    >
      <i class="icon">&#xe61c;</i>
      <p>我的</p>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IUserInfo from "@/constant/DataModel/IUserInfo";
import { Getter, namespace } from "vuex-class";
const userModule = namespace("user");
/**
 * 全屏提示
 */
@Component
export default class StaffNav extends Vue {
  /**
   * 登录用户信息
   */
  @userModule.Getter("user")
  private user!: IUserInfo;

  /**
   * 登录角色
   */
  get role() {
    return this.user && this.user.roles && this.user.roles.length > 0
      ? this.user.roles[0].id
      : null;
  }
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
