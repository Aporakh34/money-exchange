import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Convert from "../views/Convert.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/convert",
      name: "convert",
      component: Convert,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export default router;
