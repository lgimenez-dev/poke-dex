import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import PokemonListView from '@/views/PokemonListView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView,
  },
  {
    path: '/general',
    name: 'general',
    component: PokemonListView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/welcome',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;