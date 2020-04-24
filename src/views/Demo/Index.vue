<template>
  <div>
    <div class="proSwiper">
      <div
        class="swiper-container proSlider"
        id="_proSwiper"
      >
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="box">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587388223288&di=2f129d6c99eac03f5ec1d4e3817e89d1&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg" />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="box">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587388223287&di=0b1e046295e5d42730e3c017297cb1d9&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd009b3de9c82d1587e249850820a19d8bd3e42a9.jpg" />
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import $ from 'jquery';

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Demo extends Vue {
  // 这里定义属性，方法，prop，emit等，详见vue-property-decorator
  mounted() {
    setTimeout(function() {
      var proSwiper = new Swiper("#_proSwiper", {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: true,
        //simulateTouch : false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }
      });
    }, 500);
  }

  created() {
    console.log($('body').width());
  }
}
</script>
<style scoped>
#_proSwiper {
  height: 488px;
}
</style>