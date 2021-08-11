import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/cards'
  },
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/cards'
      },
      {
        path: 'cards',
        component: () => import('@/views/Cards.vue')
      },
      {
        path: 'decks',
        component: () => import('@/views/Decks.vue')
      },
      {
        path: 'decks/:id',
        component: () => import('@/views/Deck.vue')
      },
      {
        path: 'filters',
        component: () => import('@/views/Filters.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
