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
          {{this.objDetail.name}}（英文名：{{this.objDetail.engName}}），别名：{{this.objDetail.alias}}{{getProtectionLevelName(this.objDetail.protectionLevel)}}，{{this.objDetail.plantTime ? (formatTime(this.objDetail.plantTime * 1000) + '我园栽种' + this.objDetail.plantCount + '棵。') : ""}}<br><br>
          <span v-show="this.objDetail.typeJie">
            界：{{this.objDetail.typeJie}}<br>
          </span>
          <span v-show="this.objDetail.typeMen">
            门：{{this.objDetail.typeMen}}<br>
          </span>
          <span v-show="this.objDetail.typeGang">
            纲：{{this.objDetail.typeGang}}<br>
          </span>
          <span v-show="this.objDetail.typeYagang">
            亚纲：{{this.objDetail.typeYagang}}<br>
          </span>
          <span v-show="this.objDetail.typeMu">
            目：{{this.objDetail.typeMu}}<br>
          </span>
          <span v-show="this.objDetail.typeKe">
            科：{{this.objDetail.typeKe}}<br>
          </span>
          <span v-show="this.objDetail.typeShu">
            属：{{this.objDetail.typeShu}}<br>
          </span>
          <span v-show="this.objDetail.typeZhong">
            种：{{this.objDetail.typeZhong}}
          </span>
          <br><br>
          <b>地理分布</b>
          <p>{{this.objDetail.geographical}}</p> <br>
          <b>形态特征</b>
          <p>{{this.objDetail.morphologicalCharacte}}</p> <br>
          <b>植物文化</b>
          <p>{{this.objDetail.culture}}</p> <br>
        </div>
        <div
          class="video"
          v-if="this.objDetail.videoList && this.objDetail.videoList.length > 0"
        >
          <video
            preload="auto"
            controls="controls"
            :src="this.objDetail.videoList[0].url"
          ></video>
        </div>
        <div
          class="video"
          v-if="this.objDetail.audioList && this.objDetail.audioList.length > 0"
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
import { plantApi } from "@/api";
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
   * 获取保护级别名称
   */
  getProtectionLevelName(val: string): string {
    switch (val) {
      case "1":
        return "，濒危保护植物";
      case "2":
        return "，渐危保护植物";
      case "3":
        return "，稀有保护植物";
      default:
        return "";
    }
  }

  /**
   * 获取植物
   */
  async getZoneDetail() {
    const res = await plantApi.getDetail(this.id);
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

  back() {
    if (this.src) {
      window.location.href = this.src;
    } else {
      this.$router.push("/");
    }
  }
}
</script>