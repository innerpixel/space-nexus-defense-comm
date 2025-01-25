import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommunicationsView from '../views/CommunicationsView.vue'

const router = createRouter({
  history: createWebHistory('/space-nexus-defense-comm/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/communications',
      name: 'communications',
      component: CommunicationsView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
