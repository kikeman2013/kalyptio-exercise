import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/Cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
  },
];

const router = new VueRouter({
  routes,
  //mode: "history",
  base: __dirname,
});

export default router;
