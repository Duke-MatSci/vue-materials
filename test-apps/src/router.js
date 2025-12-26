import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/vuematerial/components/list',
    name: 'List',
    component: App
  },
  {
    path: '/vuematerial/components/list/router',
    name: 'ListRouter',
    component: App
  },
  {
    path: '/vuematerial/components/list/router/:id',
    name: 'ListRouterItem',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
