import router from "./router";

router.beforeEach((to, from, next) => {
  document.title = `后台管理 | ${to.meta.title}`;
  const role = localStorage.getItem("ms_username");
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    // role === 'admin' ? next() : next('/403')
    // store.state.routes.includes(to.path) ? next() : next("/403");
  } else if (role && to.path === "/login") {
    next(from.path);
  } else {
    next();
  }
});
