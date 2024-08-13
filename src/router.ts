import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authBasic, authAdmin, authAdvisor, authAuthor } from './hooks/useAuth'

import Main from './views/Main.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { layout: 'default' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
