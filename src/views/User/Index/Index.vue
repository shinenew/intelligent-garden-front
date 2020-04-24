<template>
  <div class="main indexPage">
    <header>
      <div class="headerCon">
        <h1>首页</h1>
      </div>
    </header>
    <div class="search">
      <div class="box">
        <i class="icon">&#xe628;</i>
        <input type="text" placeholder="请搜索设备名称、站点及计划时间" class="text" />
      </div>
      <button class="icon">&#xe629;</button>
    </div>
    <div class="fastNav">
      <a href="javascript:void(0);">
        <i class="icon">&#xe62c;</i>
        <p>园区100家</p>
      </a>
      <a href="javascript:void(0);">
        <i class="icon">&#xe62d;</i>
        <p>植物10万颗</p>
      </a>
      <a href="javascript:void(0);">
        <i class="icon">&#xe62e;</i>
        <p>建筑2000个</p>
      </a>
    </div>
    <div class="pageBox">
      <div class="list">
        <ul>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/def-pic.png" />
              </div>
              <dl>
                <dt>沙坪坝森林公园</dt>
                <dd>
                  <p>集各种古树、教育、文化交流于一体集各种古树、教育、文化交流于一体</p>
                  <b class="orange">201颗植物</b>
                </dd>
              </dl>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/def-pic.png" />
              </div>
              <dl>
                <dt>沙坪坝森林公园</dt>
                <dd>
                  <p>集各种古树、教育、文化交流于一体集各种古树、教育、文化交流于一体</p>
                  <b class="orange">201颗植物</b>
                </dd>
              </dl>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/def-pic.png" />
              </div>
              <dl>
                <dt>沙坪坝森林公园</dt>
                <dd>
                  <p>集各种古树、教育、文化交流于一体集各种古树、教育、文化交流于一体</p>
                  <b class="orange">201颗植物</b>
                </dd>
              </dl>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <div class="pic">
                <img src="../../../assets/img/def-pic.png" />
              </div>
              <dl>
                <dt>沙坪坝森林公园</dt>
                <dd>
                  <p>集各种古树、教育、文化交流于一体集各种古树、教育、文化交流于一体</p>
                  <b class="orange">201颗植物</b>
                </dd>
              </dl>
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
export default class Index extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>