<template>
  <div class="main loginPg">
    <div class="pageBox">
      <div class="tit">
        <h6>园林小筑-移动端</h6>
      </div>

      <div class="form">
        <label class="mod">
          <i class="icon">&#xe61e;</i>
          <input
            type="text"
            placeholder="请输入用户名"
            class="text"
            v-model="userName"
          />
        </label>
        <!-- <label class="mod">
          <i class="icon">&#xe61e;</i>
          <input type="text" placeholder="请输入手机验证码" class="text textYzm" />
          <a href="javascript:void(0);" class="btn btnSmall">获取验证码</a>
        </label> -->
        <label class="mod">
          <i class="icon">&#xe61e;</i>
          <input
            type="password"
            placeholder="请输入密码"
            class="text"
            v-model="userPwd"
          />
        </label>
      </div>
      <div class="btns">
        <a
          href="javascript:void(0);"
          class="btn btnBig"
          @click="login"
        >登录</a>
      </div>
      <!-- <div class="tip">
        登录注册即已阅读并同意
        <a href="javascript:void(0);">《用户协议》</a>与
        <a href="javascript:void(0);">《隐私条款》</a>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation, Getter, namespace } from "vuex-class";
import IUserInfo from "@/constant/DataModel/IUserInfo";
import { authApi } from "@/api";

const userModule = namespace("user");

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Login extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
  private userName: string | null = null;
  private userPwd: any = null;

  /**
   * 登录用户信息
   */
  @userModule.Getter("user")
  private user!: IUserInfo;

  /**
   * 设置accessToken
   */
  @userModule.Mutation("setAccessToken")
  private setAccessToken(token: {
    accessToken: string;
    accessTokenExp?: number;
    refeshToken?: string;
    refeshTokenExp?: number;
  }): void {}

  /**
   * 设置登录用户信息
   */
  @userModule.Mutation("setUser")
  private setUser(user: IUserInfo): void {}

  created() {
    if (this.user) {
      // 跳转到工作台
      this.$router.push("/staff");
    }
  }

  /**
   * 登录
   */
  async login() {
    if (!this.userName) {
      alert("请输入用户名");
      return;
    }
    if (!this.userPwd) {
      alert("请输入密码");
      return;
    }

    const res = await authApi.login({
      userName: this.userName,
      userPwd: this.userPwd
    });
    if (!res.success || !res.data) {
      alert("登录失败：" + res.errMsg);
      return;
    }

    // alert("登录成功");
    if (!res.data.token) {
      alert("未获取到登录用户token");
      return;
    }

    if (!res.data.loginUserInfo) {
      alert("未获取到登录用户信息");
      return;
    }

    if (
      !res.data.loginUserInfo.roles ||
      res.data.loginUserInfo.roles.length === 0
    ) {
      alert("登录用户还未分配权限");
      return;
    }

    // if (res.data.loginUserInfo.roles[0].id !== 3) {
    //   alert("养护工端只允许养护工登录，请前往PC端登录");
    //   return;
    // }

    this.setAccessToken({
      accessToken: res.data.token
    });
    this.setUser(res.data.loginUserInfo);

    switch (res.data.loginUserInfo.roles[0].id) {
      case 3: // 养护工
        this.$router.push("/staff");
        break;
      default: // 其他
        this.$router.push("/staff/workbench");
        break;
    }
  }
}
</script>
