<template>
  <div class="main listPage">
    <div class="search">
      <div class="box">
        <i class="icon">&#xe628;</i>
        <input type="text" placeholder="请搜索设备名称、站点及计划时间" class="text" />
      </div>
    </div>
    <div class="banner">
      <a href="javascript:void(0);">
        <img src="../../../assets/img/list-banner.png" />
      </a>
    </div>
    <div class="pageBox">
      <div class="scrollTxt">
        <a href="javascript:void(0);">
          <div class="l">
            <i class="icon">&#xe625;</i>
          </div>
          <div class="c">
            <p>沙坪坝森林公园创立于2011年。园区拥有3215987万平方米</p>
          </div>
          <div class="r">
            <i class="icon">&#xe61e;</i>
          </div>
        </a>
      </div>
      <div class="list">
        <ul>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/sz.jpg" />
              </div>
              <p>西北白杨树</p>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/list-banner.png" />
              </div>
              <p>西北白杨树西北白杨树西北白杨树西北白杨树</p>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/sz.jpg" />
              </div>
              <p>西北白杨树</p>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/sz.jpg" />
              </div>
              <p>西北白杨树</p>
            </a>
          </li>
        </ul>
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
export default class List extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>