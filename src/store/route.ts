import IRoute from "@/constant/DataModel/IRoute";
import CommonUtil from "@/utils/commonUtil";

// 路由类state保存的缓存的key
const ROUTE_STATE_KEY: string = "STORE-STATE-ROUTE";

const defaultState: {
  routes: IRoute[],
} = {
  routes: [], // vue-router的路由数组，记录用户进入页面开始的所有路由变化情况，包含不存在的路由和未授权的路由
};

export default {
  namespaced: true,
  state: {
    ...defaultState
  },
  getters: {
    /**
     * 获取当前state
     * @param state state
     */
    allRoute(state: any): any {
      const routeState: any = CommonUtil.getObjFromStorage(ROUTE_STATE_KEY);
      if (routeState) {
        state = routeState;
      }
      return state === null ? null : state.routes;
    },
    /**
     * 获取当前路由
     * @param state state
     */
    currentRoute(state: any): IRoute | null {
      const routeState: any = CommonUtil.getObjFromStorage(ROUTE_STATE_KEY);
      if (routeState) {
        state = routeState;
      }
      return state.routes === null || state.routes.length === 0 ? null : state.routes[state.routes.length - 1];
    }
  },
  mutations: {
    clear(state: any): void {
      // 循环属性赋值
      for (const key of Object.entries(defaultState)) {
        state[key[0]] = key[1];
      }

      CommonUtil.removeStorage(ROUTE_STATE_KEY);
    },
    /**
     * 添加路由历史
     * @param state state
     * @param route 路由
     */
    addRoute(state: any, route: IRoute): void {
      // console.log("进入addRoute");
      // console.log(route);
      if (state === null || state.routes === null) {
        state.routes = [];
      }

      // 由于刷新页面时，会先触发路由守卫，此时state是没有数据的，所以这里添加前，需要先检查缓存
      const routeState: any = CommonUtil.getObjFromStorage(ROUTE_STATE_KEY);
      if (routeState) {
        state = routeState;
      }

      state.routes.push(route);
      CommonUtil.saveStorage(ROUTE_STATE_KEY, state);
    }
  },
  actions: {
    /**
     * 添加路由历史Action
     * @param content content
     * @param route 路由
     */
    addRouteAction(content: any, route: IRoute): void {
      content.commit("addRoute", route);
    },
    /**
     * 清空state
     * @param content content
     */
    clearAction(content: any): void {
      content.commit("clear");
    }
  }
};
