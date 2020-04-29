<template>
  <!-- 提示 -->
  <div
    v-show="loadding"
    class="loadding"
  >
    <img src="~@/assets/img/list-loadding.png" />加载中…
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

/**
 * 全屏提示
 */
@Component
export default class ListLoadding extends Vue {
  /**
   * 显示加载中
   */
  @Prop()
  private loadding!: boolean;
}
</script>

<style>
</style>
