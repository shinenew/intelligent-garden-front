<template>
  <div class="main staffHome">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
        <h1>首页</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="scan">
        <img src="../../../assets/img/scan.png" />
      </div>
      <div class="tab">
        <ul>
          <li class="cu">
            <span>
              待完成任务
              <em>99</em>
            </span>
          </li>
          <li>
            <span>
              已领取任务
              <em>1</em>
            </span>
          </li>
        </ul>
      </div>
      <div class="list">
        <ul>
          <li>
            <a href="javascript:void(0);" class="btn btnMiddel">查看任务</a>
            <dl>
              <dt>
                沙坪坝森林公园
                <b class="date">05-08日</b>
              </dt>
              <dd>
                <p>A区</p>
                <p>清理树枝，并处理虫害</p>
              </dd>
            </dl>
          </li>
          <li>
            <a href="javascript:void(0);" class="btn btnMiddel">查看任务</a>
            <dl>
              <dt>
                沙坪坝森林公园
                <b class="date">05-08日</b>
              </dt>
              <dd>
                <p>A区</p>
                <p>清理树枝，并处理虫害</p>
              </dd>
            </dl>
          </li>
          <li>
            <a href="javascript:void(0);" class="btn btnMiddel">查看任务</a>
            <dl>
              <dt>
                沙坪坝森林公园
                <b class="date">05-08日</b>
              </dt>
              <dd>
                <p>A区</p>
                <p>清理树枝，并处理虫害</p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>

    <nav>
      <a href="javascript:void(0);" class="cu">
        <i class="icon">&#xe620;</i>
        <p>首页</p>
      </a>
      <a href="javascript:void(0);">
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