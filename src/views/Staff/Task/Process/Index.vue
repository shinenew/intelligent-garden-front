<template>
  <div class="main processPage">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
        <h1>填写评价</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="form">
        <label class="mod">
          <i>园区名称</i>
          <em class="gray">请选样园区</em>
          <select>
            <option>园区一</option>
            <option>园区二</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>区域</i>
          <em class="gray">请选择区域</em>
          <select>
            <option>A</option>
            <option>B</option>
          </select>
          <div class="icon modDot">&#xe61e;</div>
        </label>
        <label class="mod">
          <i>植物/建筑名称</i>
          <input type="text" placeholder="请填写" class="text" />
        </label>
        <label class="mod">
          <i>评价内容</i>
          <input type="text" placeholder="请填写评价内容" class="text" />
        </label>
        <label class="mod modFull">
          <i>上传图片</i>
          <em>
            <span class="uploadPic">
              <a href="javascript:void(0)" class="upContrl"></a>
            </span>
          </em>
        </label>
      </div>
    </div>
    <footer>
      <a href="javascript:void(0);" class="btn btnBig">提交</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Process extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>