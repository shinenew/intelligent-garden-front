import { Route } from "vue-router";
import router from "./index";
import store from "@/store";
import IUserInfo from "@/constant/DataModel/IUserInfo";
// import INav from "@/constant/DataModel/INav";
// import IRoute from "@/constant/DataModel/IRoute";

/**
 * 路由导航守卫
 */
router.beforeEach((to: Route, from: Route, next) => {
  console.log("-----------router-defend-----------");
  console.log("--from--");
  console.log(from);
  console.log("--to--");
  console.log(to);
  console.log(to.fullPath);
  console.log(router);

  // 权限校验
  // 是否允许匿名
  let allowNext: boolean = false;
  let refuseCode: string | null = null;
  let refuseReason: string | null = null;

  // 直接通过前端路由判断权限
  if (to.meta && to.meta.anonymous) {
    allowNext = true;
  } else {
    // 判断登录
    const isLogin: boolean = store.getters["user/isLogin"];
    // console.log(isLogin);
    if (isLogin) {
      // 判断角色
      const userInfo: IUserInfo = store.getters["user/user"];
      // console.log(to);
      if (to.meta
        && to.meta.allowRole
        && userInfo.roles
        && userInfo.roles.length > 0
        && (to.meta.allowRole.split(",").indexOf(userInfo.roles[0].id.toString()) >= 0 || to.meta.allowRole === "all")) {
        allowNext = true;
      } else {
        refuseReason = "无法进入" + to.fullPath + "，当前路由不允许当前角色：" + userInfo.roles[0].name + "访问";
      }
    } else {
      refuseCode = "not-login";
      refuseReason = "无法进入" + to.fullPath + "，当前路由不允许匿名访问";
    }
  }

  console.log(allowNext);

  // 将当前路由名称作为页面title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  if (allowNext) {
    // 解决IOS无法识别前端路由问题
    if (to.path !== location.pathname) {
      location.assign(to.fullPath);
    } else {
      next();
    }
  } else {
    // 跳转到无权访问页
    console.log(refuseReason);
    if (refuseCode === "not-login") {
      next({
        path: "/staff/login",
        query: {
          src: window.location.protocol + "//" + window.location.host + to.fullPath
        }
      });
    } else {
      next({
        path: "/staff/login",
        query: {}
      });
    }
  }
});