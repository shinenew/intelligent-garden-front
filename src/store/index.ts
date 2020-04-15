import Vue from "vue";
import Vuex from "vuex";
import userModule from "./user";
import configModule from "./config";
import routeModule from "./route";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    config: configModule,
    route: routeModule,
  }
});
