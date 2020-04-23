<template>
  <div class="main urgListPage">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
        <h1>应急历史记录</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="list">
        <ul>
          <li>
            <a href="javascript:void(0);">
              <div class="cor">
                <img src="../../../../assets/img/urg-cor-red.png" />
              </div>
              <dl>
                <dt>鸿恩寺森林公园</dt>
                <dd>
                  <div class="label">
                    <b class="green">大自然病虫害</b>
                  </div>
                  <div class="txt">银杏树被人用刀子划了一刀，需要补充营养液</div>
                  <div class="date">2020-09-09 12:23</div>
                </dd>
              </dl>
            </a>
          </li>
          <li>
            <a href="javascript:void(0);">
              <div class="cor">
                <img src="../../../../assets/img/urg-cor-gray.png" />
              </div>
              <dl>
                <dt>鸿恩寺森林公园</dt>
                <dd>
                  <div class="label">
                    <b class="blue">大自然病虫害</b>
                  </div>
                  <div class="txt">银杏树被人用刀子划了一刀，需要补充营养液银杏树被人用刀子划了一刀，需要补充营养液银杏树被人用刀子划了一刀，需要补充营养液</div>
                  <div class="date">2020-09-09 12:23</div>
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
export default class List extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>