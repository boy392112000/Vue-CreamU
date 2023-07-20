import { createRouter, createWebHistory } from "vue-router";

import Member from "./views/member.vue";
import MemberUpdate from "./views/MemberUpdate.vue";

const routes = [
  {
    path: "/Member",
    component: Member,
  },
  {
    path: "/MemberUpdate",
    component: MemberUpdate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
