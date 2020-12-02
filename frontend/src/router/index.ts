import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";

const lazyLoad = (viewName: string) => () => import(/* webpackChunkName: "[request]" */ `../views/${viewName}.vue`);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/", name: "Home", component: lazyLoad("Home"), meta: { requiresAuth: true }  },
  { path: "/login", name: "Login", component: lazyLoad("Login"), meta: { requiresAuth: false }  },
  { path: "/about", name: "About", component: lazyLoad("About"), meta: { requiresAuth: true }  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.auth.cookieAuthLoaded) {
    await store.dispatch("auth/loginFromCookies");
  }
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  if (requiresAuth && !isLoggedIn) {
    next({ path: "/login", query: { redirect: to.path } });
  } else {
    next();
  }
});

export default router;
