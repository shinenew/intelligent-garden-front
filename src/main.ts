import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/routeDefend";
import "element-ui/lib/theme-chalk/index.css";

// 全量引入element-ui，集成i18n实现国际化
Vue.use(ElementUI, {
  size: "medium"
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");