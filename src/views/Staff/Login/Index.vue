<template>
  <div class="main loginPg">
    <div class="pageBox">
      <div class="tit">
        <h6>园林小筑-养护端</h6>
      </div>

      <div class="form">
        <label class="mod">
          <i class="icon">&#xe61e;</i>
          <input type="text" placeholder="请输入手机号" class="text" />
        </label>
        <label class="mod">
          <i class="icon">&#xe61e;</i>
          <input type="text" placeholder="请输入手机验证码" class="text textYzm" />
          <a href="javascript:void(0);" class="btn btnSmall">获取验证码</a>
        </label>
      </div>
      <div class="btns">
        <a href="javascript:void(0);" class="btn btnBig">登录</a>
      </div>
      <div class="tip">
        登录注册即已阅读并同意
        <a href="javascript:void(0);">《用户协议》</a>与
        <a href="javascript:void(0);">《隐私条款》</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Login extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>
