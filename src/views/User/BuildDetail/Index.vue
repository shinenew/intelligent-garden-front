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
          {{this.objDetail.name}}（英文名：{{this.objDetail.engName}}），{{this.objDetail.buildTime ? (formatTime(this.objDetail.buildTime * 1000) + '开始建造') : ""}}，{{this.objDetail.finishTime ? (formatTime(this.objDetail.finishTime * 1000) + '竣工') : ""}}{{getProtectionLevelName(this.objDetail.protectionLevel)}}，<br><br>
          <b>建筑文化</b>
          <p>{{this.objDetail.cultural}}</p> <br>
        </div>
        <div
          class="video"
          v-if="this.objDetail.videoList"
        >
          <video
            preload="auto"
            controls="controls"
            :src="this.objDetail.videoList[0].url"
          ></video>
        </div>
        <div
          class="video"
          v-if="this.objDetail.audioList"
        >
          <audio
            preload="auto"
            controls="controls"
            :src="this.objDetail.audioList[0].url"
          ></audio>
        </div>
        <div
          class="pic"
          v-if="this.objDetail.addrPicList && this.objDetail.addrPicList.length > 0"
        >
          <img :src="this.objDetail.addrPicList[0].url" />
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
import { buildApi } from "@/api";
import moment from "moment";

@Component({
  components: {
    // 视图中用到的组件，在上方import，在这里注入
  }
})
export default class Detail extends Vue {
  private id: any = ""; // 园区id
  private src: any = ""; // 来源url
  private objDetail: any = null; // 建筑详情

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
    const res = await buildApi.getDetail(this.id);
    if (res.success) {
      this.objDetail = res.data;
    }
  }

  /**
   * 格式化时间
   */
  formatTime(time: any): string {
    if (time) {
      return moment(time).format("YYYY年MM月DD日");
    }

    return "";
  }

  /**
   * 获取保护级别名称
   */
  getProtectionLevelName(val: string): string {
    switch (val) {
      case "1":
        return "，一级建筑";
      case "2":
        return "，二级建筑";
      case "3":
        return "，三级建筑";
      case "4":
        return "，四级建筑";
      default:
        return "";
    }
  }

  back() {
    if (this.src) {
      window.location.href = this.src;
    } else {
      this.$router.push("/");
    }
  }
}
</script>