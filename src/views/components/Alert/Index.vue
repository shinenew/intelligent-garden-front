<template>
  <!-- 提示 -->
  <div
    class="dialog dgShow"
    v-show="alertParam.show"
  >
    <div class="dgContent">
      <div class="dgBox">
        <dl>
          <dt>{{alertParam.title}}</dt>
          <dd v-html="alertParam.content"></dd>
        </dl>
      </div>
      <div class="dgFooter">
        <a
          href="javascript:void(0);"
          @click="closeAlert"
        >知道了</a>
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
export default class AlertModal extends Vue {
  /**
   * 提示参数
   */
  private alertParam: any = {
    show: false,
    title: "",
    content: ""
  };

  /**
   * 显示提示
   */
  private alertModal(
    content: string,
    title: string = "温馨提示",
    autoCloseSecond: number = 3
  ) {
    this.alertParam.show = true;
    this.alertParam.title = title;
    this.alertParam.content = content;

    // 3秒后自动关闭
    setTimeout(this.closeAlert, autoCloseSecond * 1000);
  }

  /**
   * 关闭提示
   */
  private closeAlert() {
    this.alertParam.show = false;
    this.alertParam.title = "";
    this.alertParam.content = "";
  }

  created() {
    // 重写alter方法
    (window as any).alert = this.alertModal;
  }
}
</script>

<style>
</style>
