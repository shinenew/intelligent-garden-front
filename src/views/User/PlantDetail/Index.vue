<template>
  <div>
    Detail视图
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Detail extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>