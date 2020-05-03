<template>
  <!-- 确认 -->
  <div
    class="dialog dgShow"
    v-show="confirmParam.show"
  >
    <div class="dgContent">
      <div class="dgBox">
        <dl>
          <dt>{{confirmParam.title}}</dt>
          <dd>{{confirmParam.content}}</dd>
        </dl>
      </div>
      <div class="dgFooter col2">
        <a
          href="javascript:void(0);"
          class="gray"
          @click="confirmCancel"
        >{{confirmParam.cancelTxt}}</a>
        <a
          href="javascript:void(0);"
          @click="confirmOk"
        >{{confirmParam.okTxt}}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * 确认框
 */
@Component
export default class Confirm extends Vue {
  /**
   * 点击确认按钮
   */
  private confirmOk() {
    if (this.confirmParam.ok && typeof this.confirmParam.ok === "function") {
      this.confirmParam.ok();
    }
    // 关闭弹窗
    this.confirmParam.show = false;
  }

  /**
   * 点击确认取消按钮
   */
  private confirmCancel() {
    // 执行回调
    if (
      this.confirmParam.cancel &&
      typeof this.confirmParam.cancel === "function"
    ) {
      this.confirmParam.cancel();
    }

    // 关闭弹窗
    this.confirmParam.show = false;
  }

  /**
   * 确认参数
   */
  private confirmParam: any = {
    show: false,
    title: "",
    content: "",
    okTxt: "",
    ok: null,
    cancelTxt: "",
    cancel: null
  };

  /**
   * 显示确认
   */
  private confirm(
    content: string,
    ok: any,
    cancel: any = null,
    title: string = "提示",
    okTxt: string = "是",
    cancelTxt: string = "否"
  ) {
    this.confirmParam.show = true;
    this.confirmParam.title = title;
    this.confirmParam.content = content;
    this.confirmParam.okTxt = okTxt;
    this.confirmParam.ok = ok;
    this.confirmParam.cancelTxt = cancelTxt;
    this.confirmParam.cancel = cancel;
  }

  /**
   * 关闭确认
   */
  private closeConfirm() {
    this.confirmParam.show = true;
    this.confirmParam.title = "";
    this.confirmParam.content = "";
    this.confirmParam.okTxt = "";
    this.confirmParam.cancelTxt = "";
  }

  created() {
    // 重写confirm方法
    (window as any).confirm = this.confirm;
  }
}
</script>

<style>
</style>
