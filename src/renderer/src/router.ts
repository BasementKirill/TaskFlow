import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Automations from './views/Automations.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/automations', component: Automations },
]

export const router = createRouter({
  history: createWebHashHistory(), //für Electron
  routes,
})