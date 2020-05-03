<template>
  <div class="main urgListPage">
    <header>
      <div class="headerCon">
        <router-link
          to="/staff/workbench"
          class="icon arr"
        >&#xe626;</router-link>
        <h1>应急历史记录</h1>
      </div>
    </header>
    <div class="pageBox">
      <div class="list">
        <ul v-if="list && list.length > 0">
          <li
            v-for="(item, i) in list"
            :key="i"
          >
            <a
              href="javascript:void(0);"
              @click="goTo(item.id)"
            >
              <div class="cor">
                <img
                  src="~@/assets/img/urg-cor-red.png"
                  v-if="item.status === 0"
                />
                <img
                  src="~@/assets/img/cor-green.png"
                  v-else-if="item.status === 9 || item.status === -1"
                />
                <img
                  src="~@/assets/img/cor-red.png"
                  v-else
                />
              </div>
              <dl>
                <dt>{{item.zoneName}}</dt>
                <dd>
                  <div class="label">
                    <b class="green">{{item.category === 1 ? '自然灾害' : '人为破坏'}}</b>
                  </div>
                  <div class="txt">{{item.intro}}</div>
                  <div class="date">{{formatDate(item.createTime)}}</div>
                </dd>
              </dl>
            </a>
          </li>
          <!-- <li>
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
          </li> -->
          <!-- 列表加载中 -->
          <ListLoadding :loadding="loadding" />
        </ul>
        <!-- 没有数据时 -->
        <div
          class="nodata"
          v-else
        >
          <div class="tip">
            <dl>
              <dt><img src="~@/assets/img/img-blxx.png" /></dt>
              <dd>
                <p>暂无数据~</p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { urgentApi } from "@/api";
import ListLoadding from "@/views/components/ListLoadding/Index.vue";
import moment from "moment";

@Component({
  components: {
    ListLoadding
  }
})
export default class List extends Vue {
  private list: any[] = [];
  private page: number = 1;
  private pageSize: number = 10;
  private committing: boolean = false; // 翻页锁定状态
  private loadding: boolean = false;

  created() {
    this.getList();
  }

  /**
   * 定义注册的监听函数
   */
  private listenerScroll($event: any) {
    this.throttle(this.handleScroll, 500, 500, $event)();
  }

  /**
   * 渲染完成后，注册滚动事件
   */
  mounted() {
    document.addEventListener("scroll", this.listenerScroll, true);
  }

  /**
   * 页面销毁之前注销注册的事件
   */
  beforeDestroy() {
    document.removeEventListener("scroll", this.listenerScroll, true);
  }

  /**
   * 滚动
   */
  private handleScroll(e: any) {
    if (this.committing) {
      return;
    }
    if (e instanceof Event) {
      var el: any = e.target;
      var scHeight = el.scrollHeight,
        scTop = el.scrollTop,
        clHeight = el.clientHeight;
      //距离底部100px时，开始加载数据
      if (scHeight - scTop > clHeight + 100) return;
      // 发送请求
      this.getList(true);
    }
  }

  /**
   * 函数节流
   * fn:延时调用函数
   * delay:延迟时间，单位毫秒
   * atleast:至少多长时间触发一次
   */
  private throttle(fn: any, delay: number, atleast: any, event: any) {
    let timer: any = null;
    let previous: any = null;
    return function() {
      var now = +new Date();
      if (!previous) previous = now;
      if (atleast && now - previous > atleast) {
        fn(event);
        // 重置上一次开始时间为本次结束时间
        previous = now;
        clearTimeout(timer);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn(event);
          previous = null;
        }, delay);
      }
    };
  }

  /**
   * 查询应急列表
   */
  async getList(concat: boolean = false) {
    if (!concat) {
      this.page = 1;
      this.list = [];
    }
    this.committing = true;
    this.loadding = true;
    const res = await urgentApi.getPageList({
      page: this.page,
      pageSize: this.pageSize
    });
    this.loadding = false;
    if (res.success && res.data) {
      // this.zoneList = res.data.items;
      if (this.list && this.list.length >= res.data.total) {
        // 翻到最后一页了
        // console.log("page:" + this.page);
        return;
      }
      ++this.page; // 当前页+1
      this.committing = false; // 释放锁定状态
      if (concat) {
        // 将当前数据拼接到已有数据中
        this.list = this.list.concat(res.data.items);
      } else {
        this.list = res.data.items;
      }
    }

    this.committing = false;
  }

  /**
   * 跳转到
   */
  goTo(id: number) {
    const url = `/staff/urgent/detail?id=${id}&src=${encodeURIComponent(
      window.location.href
    )}`;
    this.$router.push(url);
  }

  /**
   * 格式化日期
   */
  formatDate(val: number, format: string = "YYYY-MM-DD") {
    return moment(val).format(format);
  }
}
</script>