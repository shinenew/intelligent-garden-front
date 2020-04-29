import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/**
 * 注意：如果路由允许非登录访问，则需要配置meta:{anonymous: true,}，
 * 否则导航守卫会检查访问路由URL是否与登录后取得的权限菜单URL一致，从而判断是否具有访问页面的权限
 */
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/User/Index/Index.vue"),
      meta: {
        anonymous: true,
        allowRole: "", // 允许访问的角色
      }
    },
    {
      path: "/list",
      name: "list",
      component: () => import("@/views/User/List/Index.vue"),
      meta: {
        anonymous: true,
        allowRole: "", // 允许访问的角色
      }
    },
    {
      path: "/plantDetail",
      name: "plantDetail",
      component: () => import("@/views/User/PlantDetail/Index.vue"),
      meta: {
        anonymous: true,
        allowRole: "", // 允许访问的角色
      }
    },
    {
      path: "/buildDetail",
      name: "buildDetail",
      component: () => import("@/views/User/BuildDetail/Index.vue"),
      meta: {
        anonymous: true,
        allowRole: "", // 允许访问的角色
      }
    },
    {
      path: "/staff",
      name: "staff",
      component: () => import("@/views/Staff/Index/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/login",
      name: "login",
      component: () => import("@/views/Staff/Login/Index.vue"),
      meta: {
        anonymous: true,
        allowRole: "", // 允许访问的角色
      }
    },
    {
      path: "/staff/about",
      name: "about",
      component: () => import("@/views/Staff/My/About/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/my",
      name: "my",
      component: () => import("@/views/Staff/My/Index/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/workbench",
      name: "staff-workbench",
      component: () => import("@/views/Staff/Workbench/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/task/list",
      name: "staff-task-list",
      component: () => import("@/views/Staff/Task/List/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/task/detail",
      name: "staff-task-detail",
      component: () => import("@/views/Staff/Task/Detail/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/task/process",
      name: "staff-task-process",
      component: () => import("@/views/Staff/Task/Process/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/urgent/list",
      name: "staff-urgent-list",
      component: () => import("@/views/Staff/Urgent/List/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/urgent/detail",
      name: "staff-urgent-detail",
      component: () => import("@/views/Staff/Urgent/Detail/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    },
    {
      path: "/staff/urgent/write",
      name: "staff-urgent-write",
      component: () => import("@/views/Staff/Urgent/Write/Index.vue"),
      meta: {
        anonymous: false,
        allowRole: "3", // 允许访问的角色
      }
    }
  ]
});