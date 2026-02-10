import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from './views/DashboardView.vue'
import Automations from './views/AutomationsView.vue'
import Login from './views/LoginView.vue'
import SignUp from './views/SignUpView.vue'
import { supabase } from './lib/supabase'


const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    redirect: { name: 'Dashboard' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/automations',
    name: 'Automations',
    component: Automations,
    meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  }
  // If user is authenticated and trying to access login/signup
  else if ((to.name === 'Login' || to.name === 'SignUp') && isAuthenticated) {
    next({ name: 'Dashboard' })
  }
  // Otherwise, allow navigation
  else {
    next()
  }
})