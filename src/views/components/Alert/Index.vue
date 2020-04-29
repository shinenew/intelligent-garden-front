<template>
  <!-- 提示 -->
  <div
    class="toast"
    v-show="alertParam.show"
  >
    <dl v-show="!alertParam.success">
      <dt>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-ic_xxx"></use>
        </svg>
      </dt>
      <dd>{{alertParam.content}}</dd>
    </dl>
    <dl v-show="alertParam.success">
      <dt>
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-ic_duigx"></use>
        </svg>
      </dt>
      <dd>{{alertParam.content}}</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * 提示
 */
@Component
export default class Alert extends Vue {
  /**
   * 提示参数
   */
  private alertParam: any = {
    show: false,
    success: "",
    content: ""
  };

  /**
   * 显示提示
   */
  private alert(
    content: string,
    success: boolean = true,
    autoCloseSecond: number = 30
  ) {
    this.alertParam.show = true;
    this.alertParam.success = success;
    this.alertParam.content = content;

    // 3秒后自动关闭
    if (autoCloseSecond > 0) {
      setTimeout(this.closeAlert, autoCloseSecond * 1000);
    }
  }

  /**
   * 关闭提示
   */
  private closeAlert() {
    this.alertParam.show = false;
    this.alertParam.success = true;
    this.alertParam.content = "";
  }

  created() {
    // 重写alter方法
    (window as any).alert = this.alert;
  }
}
</script>

<style>
</style>
