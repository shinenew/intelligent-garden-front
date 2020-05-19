<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";
import wx from "wx-sdk-ts";
import { authApi } from "@/api";

const configModule = namespace("config");

/**
 * 提示
 */
@Component
export default class WxJsSdk extends Vue {
  private wxAppId: string = "wxfb3c5c54aa86b833";

  /**
   * 微信分享配置
   */
  private shareConfg: any = {
    desc: "智管理，您的园林专业管家", // 分享描述
    imgUrl:
      window.location.protocol + "//" + window.location.host + "/img/logo.jpg", // 分享图标
    link: window.location.protocol + "//" + window.location.host, // 分享链接
    title: "智管理" // 分享标题
  };

  /**
   * 微信jssdk配置
   */
  private wxJssdkConfig!: any;

  private callback!: any;

  /**
   * 获取微信配置
   */
  private async getWxConfig() {
    // 获取jssdk配置
    const url = window.location.href;
    // console.log("当前url：" + url);
    // console.log("编码后url：" + encodeURIComponent(url));
    const res = await authApi.getWxJsSdkConfig({
      url: encodeURIComponent(url)
    });

    // console.log(res);
    if (res.success && res.data) {
      this.wxJssdkConfig = res.data;
      const self = this;

      // 注入配置
      wx.config({
        debug: false,
        appId: this.wxAppId,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
          "scanQRCode"
        ]
      });

      wx.ready(() => {
        wx.onMenuShareTimeline(this.shareConfg);
        wx.onMenuShareAppMessage(this.shareConfg);
        wx.onMenuShareQQ(this.shareConfg);
        wx.onMenuShareQZone(this.shareConfg);
      });
    } else {
      (window as any).alert("获取微信jssdk失败", false);
    }
  }

  /**
   * 设置分享配置
   */
  private setShareConfig(
    title: string = "哲源健康",
    link: string = window.location.protocol + "//" + window.location.host, // 默认分享到首页
    desc: string = "医学大数据为您服务",
    imgUrl: string = window.location.protocol +
      "//" +
      window.location.host +
      "/logo.png"
  ) {
    this.shareConfg.title = title;
    this.shareConfg.desc = desc;
    this.shareConfg.imgUrl = imgUrl;
    this.shareConfg.link = link;
    // console.log(this.shareConfg);
  }

  private setScanCallback(callback: any) {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function(res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        if (callback) {
          callback(result);
        }
      }
    });
  }

  created() {
    if (process.env.NODE_ENV !== "development") {
      this.getWxConfig();
      (window as any).setWxShareConfig = this.setShareConfig;
      (window as any).setScan = this.setScanCallback;
    }
  }
}
</script>

<style>
</style>
