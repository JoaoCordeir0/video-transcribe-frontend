import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { auth } from './hooks/useAuth'

import Main from './views/Main.vue';
import Plans from './views/Plans.vue';
import NotFound from './views/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { layout: 'default' },
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans,
    meta: { layout: 'default' },
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: 'empty' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
