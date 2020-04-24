import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./router/routeDefend";
import "./assets/css/style.css";
import "./assets/js/rem.js";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");