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
        <dt>张三</dt>
        <dd>123456789123</dd>
      </dl>
    </div>
    <div class="pageBox">
      <div class="linkList">
        <ul>
          <li>
            <a href="javascript:void(0);">
              <p>关于我们</p>
              <i class="icon">&#xe61e;</i>
            </a>
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
    <nav>
      <a href="javascript:void(0);">
        <i class="icon">&#xe620;</i>
        <p>首页</p>
      </a>
      <a href="javascript:void(0);" class="cu">
        <i class="icon">&#xe61d;</i>
        <p>工作台</p>
      </a>
      <a href="javascript:void(0);">
        <i class="icon">&#xe61c;</i>
        <p>我的</p>
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Index extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>