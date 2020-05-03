<template>
  <div class="main my">
    <header>
      <h1>我的</h1>
    </header>
    <div class="info">
      <div class="pic">
        <img src="../../../../assets/img/user.png" />
      </div>
      <dl>
        <dt>{{user ? user.realName : null}}</dt>
        <dd>{{user ? user.mobile : null}}</dd>
      </dl>
    </div>
    <div class="pageBox">
      <div class="linkList">
        <ul>
          <li>
            <router-link to="/staff/about">
              <p>关于我们</p>
              <i class="icon">&#xe61e;</i>
            </router-link>
          </li>
          <li>
            <a href="javascript:void(0);" @click="logout">
              <p>退出登录</p>
              <i class="icon">&#xe61e;</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <NavComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavComponent from "@/views/components/StaffNav/Index.vue";
import { Getter, namespace } from "vuex-class";
import IUserInfo from "@/constant/DataModel/IUserInfo";
import { authApi } from '@/api';
const userModule = namespace("user");
@Component({
  components: {
    NavComponent
  }
})
export default class Index extends Vue {
  /**
   * 登录用户信息
   */
  @userModule.Getter("user")
  private user!: IUserInfo;

  /**
   * 清空登录信息
   */
  @userModule.Action("clearAction")
  private clearUser() {}

  created() {
    // console.log(this.user);
  }

  /**
   * 确认注销
   */
  private async doLogout() {
    // console.log('123');
    const res = await authApi.logout();
    if (res.success) {
      alert("退出登录成功");
      this.clearUser();
      this.$router.push("/staff");
    } else {
      (window as any).alert("退出登录失败", false);
    }
  }

  private logout() {
    (window as any).confirm(
      "如退出登录，微信账户将与系统解除绑定，下次登录时需要重新验证用户名、密码绑定。如需要保留微信账户与系统的绑定关系，请直接关闭页面返回微信。",
      this.doLogout,
      null,
      "是否确认退出登录？"
    );
  }
}
</script>