import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import Music from "../views/Music.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/music",
    name: "Music",
    component: Music,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
