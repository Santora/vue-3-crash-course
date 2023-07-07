import { createRouter, createWebHistory } from "vue-router";
import View from "../views/View.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todos",
      component: View,
    },

  ],
});

export default router;