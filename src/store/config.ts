
import CommonUtil from "@/utils/commonUtil";

// 配置类state保存的缓存的key
const CONFIG_STATE_KEY: string = "STORE-STATE-CONFIG";

const defaultState: {
  baseUrl: string,
  qqService: string | null,
} = {
  baseUrl: process.env.VUE_APP_ENV_WEB_URL,
  qqService: null,
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
    all(state: any): any {
      const storageState: any = CommonUtil.getObjFromStorage(CONFIG_STATE_KEY);
      if (storageState) {
        state = storageState;
      }
      return state;
    },
    qqService(state: any): string {
      return state === null ? null : state.qqService;
    }
  },
  mutations: {
    /**
     * 清除state
     * @param state state
     */
    clear(state: any): void {
      // 循环属性赋值
      for (const key of Object.entries(defaultState)) {
        state[key[0]] = key[1];
      }

      CommonUtil.removeStorage(CONFIG_STATE_KEY);
    },
    setQQService(state: any, qqService: string): void {
      state.qqService = qqService;
      CommonUtil.saveStorage(CONFIG_STATE_KEY, state);
    }
  },
  actions: {
    clearAction(content: any): void {
      content.commit("clear");
    },
  }
};
