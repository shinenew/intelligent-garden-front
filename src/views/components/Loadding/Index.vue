<template>
  <!-- 提示 -->
  <div
    class="dialog dgShow"
    v-show="loaddingParam.show"
  >
    <div class="dgContent">
      <div class="dgBox">
        <dl>
          <dt><img src="~@/assets/img/timg.gif" style="width: 50px;" /></dt>
          <dt>{{loaddingParam.title}}</dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * 全屏提示
 */
@Component
export default class Loadding extends Vue {
  /**
   * 提示参数
   */
  private loaddingParam: any = {
    show: false,
    title: "",
    content: ""
  };

  /**
   * 显示提示
   */
  private loadding(title: string = "加载中") {
    this.loaddingParam.show = true;
    this.loaddingParam.title = title;
  }

  /**
   * 关闭提示
   */
  private closeLoadding() {
    this.loaddingParam.show = false;
    this.loaddingParam.title = "";
  }

  created() {
    // 重写alter方法
    (window as any).loadding = this.loadding;
    (window as any).closeLoadding = this.closeLoadding;
  }
}
</script>

<style>
</style>
