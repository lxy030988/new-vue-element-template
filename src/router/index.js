import Vue from "vue";
import Router from "vue-router";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

import Layout from "@/layout";

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/dashboard",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
          meta: {
            title: "系统首页"
          }
        },
        //基础设施
        {
          path: "/device",
          component: () =>
            import(/* webpackChunkName: "device" */ "@/views/Device.vue"),
          meta: {
            title: "设备管理"
          }
        },
        {
          path: "/404",
          component: () =>
            import(/* webpackChunkName: "404" */ "@/views/404.vue"),
          meta: {
            title: "404"
          }
        },
        {
          path: "/403",
          component: () =>
            import(/* webpackChunkName: "403" */ "@/views/403.vue"),
          meta: {
            title: "403"
          }
        }
      ]
    },
    {
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
