import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from './views/Dashboard.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    redirect: { name: 'Dashboard' } 
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard',
    component: Dashboard 
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})