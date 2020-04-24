<template>
  <div class="main plantDetailPage">
    <header>
      <div class="headerCon">
        <a href="javascript:void(0)" class="icon arr">&#xe626;</a>
        <h1>白杨树</h1>
      </div>
    </header>
    <div class="bn">
      <div class="swiper-container bannerSlide" id="_bannerSlide">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="box">
              <a href="javascript:void(0);" target="_blank">
                <div class="pic">
                  <img
                    class="lazy"
                    data-original="assets/img/ind-bn-2.jpg"
                    src="assets/img/ind-bn-2.jpg"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="swiper-pagination bCenter" id="_bnPage"></div>
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
export default class Detail extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
}
</script>