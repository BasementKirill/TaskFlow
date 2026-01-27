<script setup lang="ts">
import { router } from './router'

const handleClose = () => {
  window.close
}

const handleMinimize = () => {
  // @ts-ignore
  window.electronAPI.minimizeWindow()
}
</script>
<template>
  <div class="flex h-screen bg-[#0f121d] text-white overflow-hidden">
    <aside class="w-64 bg-[#1a1f2e] border-r border-gray-800 flex flex-col shrink-0">
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
    </aside>

    <main class="flex-1 overflow-y-auto relative">
       <div class="absolute top-0 right-0 p-4 flex gap-4 no-drag z-50">
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
</style>