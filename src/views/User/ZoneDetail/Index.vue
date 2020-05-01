<template>
  <div
    class="main plantDetailPage"
    v-if="this.objDetail"
  >
    <header>
      <div class="headerCon">
        <a
          href="javascript:void(0)"
          class="icon arr"
          @click="back"
        >&#xe626;</a>
        <h1>{{this.objDetail.name}}</h1>
      </div>
    </header>
    <div
      class="bn"
      v-show="this.objDetail.pictureList && this.objDetail.pictureList.length > 0"
    >
      <div
        class="swiper-container slider"
        id="_proSwiper"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(pic , i ) in this.objDetail.pictureList"
            :key="i"
          >
            <div class="box">
              <img :src="pic.url" />
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="pageBox">
      <div class="detail">
        <div
          class="txt"
          id="_txt"
        >
          <div
            class="moreLnk"
            id="_moreTxt"
          >
            <a href="javascript:void(0);">
              查看更多
              <i class="icon">&#xe626;</i>
            </a>
          </div>
          {{this.objDetail.name}}，本园区属于{{getLevelName(this.objDetail.level)}}{{getTypeName(this.objDetail.type)}}，园区占地面积{{this.objDetail.area}}平方米，于{{formatTime(this.objDetail.buildTime)}}开建，{{formatTime(this.objDetail.finishTime)}}建成，园区内共有植物{{this.objDetail.plantCount}}棵、知名建筑{{this.objDetail.buildCount}}个。<br><br>
          本园区位于{{this.objDetail.province}}{{this.objDetail.city}}{{this.objDetail.district}}{{this.objDetail.address}}{{this.objDetail.traffic  ? `，可乘坐${this.objDetail.traffic}到达` : ``}}。<br><br>
          园区营业时间为：{{this.objDetail.businessStart}} ~ {{this.objDetail.businessEnd}} <br><br>
          <b>园区介绍</b>
          <p>{{this.objDetail.intro}}</p> <br>
          <b>文化历史</b>
          <p>{{this.objDetail.cultural}}</p> <br>
          <b>联系我们</b>
          <p>联系人：{{this.objDetail.linkMan}}，联系电话：{{this.objDetail.linkTel}}</p> <br>
        </div>
        <div
          class="pic"
          v-if="this.objDetail.graghList && this.objDetail.graghList.length > 0"
        >
          <img :src="this.objDetail.graghList[0].url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/css/swiper.css";
import $ from "jquery";
import commonUtil from "@/utils/commonUtil";
import { plantApi, zoneApi } from "@/api";
import moment from "moment";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Detail extends Vue {
  private id: any = ""; // 园区id
  private src: any = ""; // 来源url
  private objDetail: any = null; // 植物详情

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
      $("#_moreTxt").on("click", function() {
        $("#_txt").css("height", "auto");
        $(this).hide();
      });
    }, 500);
  }

  created() {
    this.id = commonUtil.getUrlParam("id", window.location.search);
    this.src = commonUtil.getUrlParam("src", window.location.search);
    if (this.id) {
      this.getZoneDetail();
    }
  }

  /**
   * 获取植物
   */
  async getZoneDetail() {
    const res = await zoneApi.getDetail(this.id);
    if (res.success) {
      this.objDetail = res.data;
    }
  }

  /**
   * 格式化时间
   */
  formatTime(time: any): string {
    if (time) {
      return moment(time * 1000).format("YYYY年MM月DD日");
    }

    return "";
  }

  back() {
    if (this.src) {
      window.location.href = this.src;
    } else {
      this.$router.push("/");
    }
  }

  getLevelName(val: number) {
    switch (val) {
      case 1:
        return "A级";
      case 2:
        return "AA级";
      case 3:
        return "AAA级";
      case 4:
        return "AAAA级";
      case 5:
        return "AAAAA级";
      default:
        return null;
    }
  }

  getTypeName(val: number) {
    switch (val) {
      case 1:
        return "公园";
      case 2:
        return "产业园区";
      case 3:
        return "工业园区";
      case 4:
        return "科技园区";
      // case 5:
      //   return "其他";
      default:
        return null;
    }
  }
}
</script>