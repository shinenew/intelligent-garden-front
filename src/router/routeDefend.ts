import { Route } from "vue-router";
import router from "./index";
// import store from "@/store";
// import INav from "@/constant/DataModel/INav";
// import IRoute from "@/constant/DataModel/IRoute";

/**
 * 路由导航守卫
 */
router.beforeEach((to: Route, from: Route, next) => {
  // console.log("-----------router-defend-----------");
  // console.log("--from--");
  // console.log(from);
  // console.log("--to--");
  // console.log(to);
  // console.log(to.fullPath);
  // 权限校验
  let allowNext: boolean = true;
  // let refuseReason: string | null = null;
  // let nav: INav | null = null;
  // // 判断权限
  // const navs: INav[] = store.getters["user/navs"];
  // // console.log(navs);
  // if (navs !== null && navs.length > 0) {
  //   const currentNav: INav[] = navs.filter(k => k.url === to.fullPath);
  //   if (currentNav !== null && currentNav.length > 0) {
  //     nav = currentNav[0];
  //     allowNext = true;
  //   } else {
  //     refuseReason = "菜单权限不足";
  //   }
  // } else {
  //   refuseReason = "未获取登录权限菜单";
  // }

  // // 允许匿名
  // if (!allowNext && to.meta && to.meta.anonymous) {
  //   allowNext = true;
  //   refuseReason = null;
  // }

  // 记录route
  // const route: IRoute = {
  //   url: to.fullPath, // 当前路由url
  //   anonymous: (to.meta && to.meta.anonymous) ? (to.meta && to.meta.anonymous) : false, // 该url是否允许匿名访问
  //   isLogin: store.getters["user/isLogin"] === null ? false : store.getters["user/isLogin"], // 用户是否已经登录
  //   loginInfo: store.getters["user/user"], // 登录用户信息
  //   access: allowNext, // 是否允许进入路由
  //   refuseReason: refuseReason, // 拒绝进入原因
  //   nav: nav, // 匹配到的菜单信息
  //   query: to.query, // query查询参数
  //   params: to.params, // params查询参数
  // };
  // store.dispatch("route/addRouteAction", route);

  if (allowNext) {
    next();
  } else {
    // 跳转到无权访问页
    console.log("无权访问该页面，跳转到登录页");
    next({
      path: "/auth/login",
      query: {}
    });
  }
});