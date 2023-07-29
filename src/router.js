import { createRouter, createWebHistory } from "vue-router";

import Member from "./views/member.vue";
import MemberUpdate from "./views/MemberUpdate.vue";
import OrderHistory from "./views/OrderHistory.vue";

const routes = [
  {
    path: "/",
    component: Member,
  },
  {
    path: "/MemberUpdate",
    component: MemberUpdate,
  },
  {
    path: "/OrderHistory",
    component: OrderHistory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
