import IUserInfo from "@/constant/DataModel/IUserInfo";
import INav from "@/constant/DataModel/INav";
import IReturnResult from "@/constant/DataModel/IReturnResult";
import CommonUtil from "@/utils/commonUtil";

// 保存用户状态KEY常量
const USER_STATE_KEY: string = "STORE-STATE-USER";

// state默认值
const defaultState: {
  accessToken: string | null,
  accessTokenExp: number,
  refeshToken: string | null,
  refeshTokenExp: number,
  user: IUserInfo | null,
  navs: INav[],
} = {
  accessToken: null,
  accessTokenExp: 0,
  refeshToken: null,
  refeshTokenExp: 0,
  user: null,
  navs: [],
};

export default {
  namespaced: true,
  state: {
    ...defaultState
  },
  getters: {
    /**
     * 获取user.state
     * @param state state
     */
    all(state: any): any {
      const storageState: any = CommonUtil.getObjFromStorage(USER_STATE_KEY);
      if (storageState) {
        state = storageState;
      }
      return state;
    },
    /**
     * 获取有效的accessToken值
     * @param state state
     */
    accessToken(state: any): string | null {
      const storageState: any = CommonUtil.getObjFromStorage(USER_STATE_KEY);
      if (storageState) {
        state = storageState;
      }
      if (state.accessToken) {
        // 判断是否过期
        if (state.accessTokenExp === 0 || state.accessTokenExp > CommonUtil.getTimeSpan()) {
          return state.accessToken;
        }
      }
      return null;
    },
    /**
     * 判断是否登录
     * @param state state
     */
    isLogin(state: any): boolean {
      const storageState: any = CommonUtil.getObjFromStorage(USER_STATE_KEY);
      if (storageState) {
        state = storageState;
      }
      // accessToken存在，accessToken未过期，user存在
      return state.accessToken &&
        (state.accessTokenExp === 0 || state.accessTokenExp > CommonUtil.getTimeSpan())
        && state.user !== null;
    },
    /**
     * 获取登录用户信息
     * @param state state
     */
    user(state: any): IUserInfo | null {
      const storageState: any = CommonUtil.getObjFromStorage(USER_STATE_KEY);
      if (storageState) {
        state = storageState;
      }
      return state.user;
    },
    /**
     * 获取登录用户菜单列表
     * @param state state
     */
    navs(state: any): INav {
      const storageState: any = CommonUtil.getObjFromStorage(USER_STATE_KEY);
      if (storageState) {
        state = storageState;
      }
      return state.navs;
    },
  },
  mutations: {
    /**
     * 清空user.state
     * @param state state
     */
    clear(state: any): void {
      // 循环属性赋值
      for (const key of Object.entries(defaultState)) {
        state[key[0]] = key[1];
      }

      CommonUtil.removeStorage(USER_STATE_KEY);
    },
    /**
     * 设置accessToken
     * @param state state
     * @param token token信息
     */
    setAccessToken(
      state: any,
      token: {
        accessToken: string,
        accessTokenExp: number,
        refeshToken?: string,
        refeshTokenExp?: number
      }): void {
      // console.log(
      //   "进入mutations：" + "accessToken=" + token.accessToken
      //   + ",accessTokenExp=" + token.accessTokenExp + ",refeshToken="
      //   + token.refeshToken + ",refeshTokenExp=" + token.refeshTokenExp);
      state.accessToken = token.accessToken;
      state.accessTokenExp = token.accessTokenExp ? token.accessTokenExp : 0;
      state.refeshToken = token.refeshToken ? token.refeshToken : null;
      state.refeshTokenExp = token.refeshTokenExp ? token.refeshTokenExp : 0;
      CommonUtil.saveStorage(USER_STATE_KEY, state);
    },
    refeshAccessToken(state: any): IReturnResult<string> {
      const result: IReturnResult<string> = {
        success: false,
        errCode: 9999,
        errMsg: "刷新token不存在或已失效",
        data: null,
      };
      if (state.refeshToken && (state.refeshTokenExp === 0 || state.refeshTokenExp > CommonUtil.getTimeSpan())) {
        // to-do
        // 调用刷新token接口，取得新的accessToken和accessTokenExp
        // 将新的accessToken和accessTokenExp赋值给state

        CommonUtil.saveStorage(USER_STATE_KEY, state);

        result.success = true;
        result.errCode = 0;
        result.errMsg = "刷新token成功";
        result.data = ""; // 新的accessToken
      }

      return result;
    },
    /**
     * 设置用户信息
     * @param state state
     * @param user 用户信息
     */
    setUser(state: any, user: IUserInfo): void {
      state.user = user;
      CommonUtil.saveStorage(USER_STATE_KEY, state);
    },
    /**
     * 设置菜单
     * @param state state
     * @param navs 菜单列表
     */
    setNavs(state: any, navs: INav[]): void {
      state.navs = navs;
      CommonUtil.saveStorage(USER_STATE_KEY, state);
    },
  },
  actions: {
    /**
     * 设置accessToken Action
     * @param content content
     * @param token token信息
     */
    setAccessTokenAction(
      content: any,
      token: {
        accessToken: string,
        accessTokenExp: number,
        refeshToken?: string,
        refeshTokenExp?: number
      }
    ): void {
      content.commit("setAccessToken", token);
    },
    /**
     * 刷新token Action
     * @param content content
     */
    refeshAccessTokenAction(
      content: any
    ): IReturnResult<string> {
      return content.commit("refeshAccessToken");
    },
    /**
     * 设置登录用户Action
     * @param content content
     * @param user 登录用户信息
     */
    setUserAction(content: any, user: IUserInfo): void {
      content.commit("setUser", user);
    },
    /**
     * 设置用户菜单列表
     * @param content content
     * @param navs 菜单列表
     */
    setNavsAction(content: any, navs: INav[]): void {
      content.commit("setNavs", navs);
    },
    /**
     * 清空state Action
     * @param content content
     */
    clearAction(content: any): void {
      content.commit("clear");
    }
  }
};
