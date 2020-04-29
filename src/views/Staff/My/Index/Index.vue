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
            <a href="javascript:void(0);">
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

  created() {
    console.log(this.user);
  }
}
</script>