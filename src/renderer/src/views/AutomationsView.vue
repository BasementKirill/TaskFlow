<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Play, Trash2, Zap, Clock } from 'lucide-vue-next'
import type { IAutomation } from '../interfaces/IAutomations'
import CreateAutomationDialog from "../Dialogs/CreateAutomationDialog.vue";

// showModal steuert den Sichtbarkeitsstatus
const showModal = ref(false)

const automations = ref<IAutomation[]>([
  { 
    id: '1', 
    name: 'Focus Mode', 
    description: 'Schließt alle Browser-Tabs und öffnet VS Code.', 
    trigger: 'manual', 
    runCount: 12, 
    isActive: true, 
    lastRun: 'Vor 2 Std.' 
  }
])

const handleRun = (id: string) => {
  const auto = automations.value.find(a => a.id === id)
  if (auto) {
    auto.runCount++
    auto.lastRun = 'Gerade eben'
  }
}

const toggleActive = (id: string) => {
  const auto = automations.value.find(a => a.id === id)
  if (auto) auto.isActive = !auto.isActive
}

const addNewAutomation = (data: any) => {
  const newAuto: IAutomation = {
    id: Date.now().toString(),
    name: data.name,
    description: 'Neu erstellte Automation',
    trigger: data.trigger,
    runCount: 0,
    isActive: true,
    lastRun: 'Nie'
  }
  automations.value.push(newAuto)
  showModal.value = false
}
</script>

<template>
  <div class="p-8 space-y-6 text-white h-screen overflow-y-auto bg-[#0f121d]">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">My Automations</h1>
        <p class="text-gray-400 font-medium">Create and manage your automated workflows</p>
      </div>
      
      <button 
        @click="showModal = true"
        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95"
      >
        <Plus :size="20" /> New Automation
      </button>
    </div>

    <div v-if="automations.length === 0" class="flex flex-col items-center justify-center py-20 text-center bg-[#1a1f2e] rounded-3xl border border-gray-800 border-dashed">
      <div class="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <Zap :size="40" class="text-gray-600" />
      </div>
      <h3 class="text-xl font-semibold mb-2">No automations yet</h3>
      <p class="text-gray-400 mb-6">Create your first automation to get started</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="auto in automations" :key="auto.id" 
        class="bg-[#1a1f2e] border rounded-2xl p-6 transition-all hover:border-gray-600"
        :class="auto.isActive ? 'border-blue-500/30' : 'border-gray-800'"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="font-bold text-lg text-white">{{ auto.name }}</h3>
              <div v-if="auto.isActive" class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p class="text-sm text-gray-400 line-clamp-2">{{ auto.description }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs mb-6">
          <span class="flex items-center gap-1 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md text-purple-400 capitalize">
            <Zap :size="12" /> {{ auto.trigger }}
          </span>
          <span v-if="auto.lastRun" class="flex items-center gap-1 text-gray-500">
            <Clock :size="12" /> {{ auto.lastRun }}
          </span>
        </div>

        <div class="flex gap-2">
          <button @click="handleRun(auto.id)" class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors">
            <Play :size="16" /> Run
          </button>
          <button @click="toggleActive(auto.id)" :class="auto.isActive ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-800 text-gray-400'" class="p-2 rounded-lg border border-transparent hover:border-gray-600 transition-all">
            <Zap :size="18" />
          </button>
          <button class="p-2 bg-gray-800 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
            <Trash2 :size="18" />
          </button>
        </div>
      </div>
    </div>

    <CreateAutomationDialog 
      v-model:open="showModal" 
      @create="addNewAutomation"
    />
  </div>
</template>