import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from './views/DashboardView.vue'
import Automations from './views/AutomationsView.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    redirect: { name: 'Dashboard' } 
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard',
    component: Dashboard 
  },
    { 
    path: '/automations', 
    name: 'Automations',
    component: Automations 
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})