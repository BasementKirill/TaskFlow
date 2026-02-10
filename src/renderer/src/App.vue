<script setup lang="ts">
import { router } from './router'
import { useAuth } from './composables/useAuth'
import { LogOut } from 'lucide-vue-next'

const { currentUser, isAuthenticated, signOut } = useAuth()

const handleClose = () => {
  window.close
}

const handleMinimize = () => {
  // @ts-ignore
  window.electronAPI.minimizeWindow()
}

const handleLogout = () => {
  signOut()
}
</script>
<template>
  <div class="flex h-screen bg-[#0f121d] text-white overflow-hidden">
    <!-- Sidebar - Only show when authenticated -->
    <aside v-if="isAuthenticated" class="w-64 bg-[#1a1f2e] border-r border-gray-800 flex flex-col shrink-0">
      <div class="p-8 drag-region">
        <span class="text-xl font-bold tracking-tight">TaskFlow 🚀</span>
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <router-link to="/dashboard" class="nav-item" active-class="nav-active">
          Dashboard
        </router-link>
        <router-link to="/automations" class="nav-item" active-class="nav-active">
          Workflows
        </router-link>
      </nav>

      <!-- User Profile Section -->
      <div class="p-4 border-t border-gray-800">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 mb-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
            {{ currentUser?.username?.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm truncate">{{ currentUser?.username }}</p>
            <p class="text-xs text-gray-400 truncate">{{ currentUser?.email }}</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded-xl transition-all font-medium text-sm"
        >
          <LogOut :size="16" />
          Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto relative">
       <!-- Window Controls - Only show when authenticated -->
       <div v-if="isAuthenticated" class="absolute top-0 right-0 p-4 flex gap-4 no-drag z-50">
         <button @click="handleMinimize" class="control-btn">─</button>
         <button @click="handleClose" class="control-btn close">✕</button>
       </div>
       
       <router-view />
    </main>
  </div>
</template>

<style scoped>
.nav-item {
  @apply block p-3 rounded-xl text-gray-400 hover:bg-gray-800 transition-all;
}
.nav-active {
  @apply bg-blue-600/20 text-blue-500 border border-blue-500/30;
}
.drag-region { -webkit-app-region: drag; }
.no-drag { -webkit-app-region: no-drag; }
.control-btn {
  @apply w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white;
}
.control-btn.close {
  @apply hover:bg-red-500 hover:text-white;
}
</style>