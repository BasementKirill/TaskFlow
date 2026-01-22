<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IPlayer } from '@/interfaces/IPlayer'
import { calculateStreak } from '../../../main/scripts/streakLogic' 

const user = ref('amk')
const streak = ref(0) 
const leaderboard = ref<IPlayer[]>([
  { name: 'Sarah Chen', xp: 12450, isMe: false },
  { name: 'Mike Johnson', xp: 11890, isMe: false },
  { name: 'Emma Davis', xp: 10320, isMe: false },
  { name: 'amk', xp: 1250, isMe: true },
  { name: 'Alex Park', xp: 8760, isMe: false }
])

onMounted(() => {
  streak.value = calculateStreak()
  console.log("Streak aktualisiert:", streak.value)
})
</script>
<template>
  <div class="p-8 text-white bg-[#0f121d] min-h-screen">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Willkommen, {{ user }}! 👋</h1>
      </div>
      <div class="flex items-center gap-4 bg-[#1a1f2e] p-3 rounded-xl border border-gray-800">
        <span class="text-xs font-bold text-orange-400">🔥 {{ streak }} day streak</span>
        <div class="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div class="bg-purple-500 h-full" :style="{ width: '50%' }"></div>
        </div>
        <span class="text-xs">250 / 500 XP</span>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800 relative overflow-hidden">
        <p class="text-gray-400 font-medium">Active Streak</p>
        <h2 class="text-5xl font-bold text-orange-500 my-2">{{ streak }} days</h2>
        <p class="text-xs text-gray-500">Keep it going! 3 more days for a new achievement.</p>
        <span class="absolute top-4 right-4 text-2xl">🔥</span>
      </div>
      
      <div class="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800">
        <p class="text-gray-400 font-medium">Total XP</p>
        <h2 class="text-5xl font-bold text-blue-500 my-2">1,250</h2>
        <p class="text-xs text-gray-500">250 XP until level 6</p>
      </div>

      <div class="bg-[#1a1f2e] p-6 rounded-2xl border border-gray-800">
        <p class="text-gray-400 font-medium">Achievements</p>
        <h2 class="text-5xl font-bold text-purple-500 my-2">3/12</h2>
        <p class="text-xs text-gray-500">Unlocked achievements</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-[#1a1f2e] p-8 rounded-2xl border border-gray-800">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
          <span class="text-yellow-400">⚡</span> Quick Actions
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="bg-blue-600 hover:bg-blue-500 p-6 rounded-xl transition-all flex flex-col items-center gap-3">
             <span class="text-2xl">⚡</span> New Workflow
          </button>
          <button class="bg-green-600 hover:bg-green-500 p-6 rounded-xl transition-all flex flex-col items-center gap-3">
             <span class="text-2xl">▶</span> Run Workflow
          </button>
          <button class="bg-purple-600 hover:bg-purple-500 p-6 rounded-xl transition-all flex flex-col items-center gap-3">
             <span class="text-2xl">🎯</span> Schedule Task
          </button>
        </div>
      </div>

      <div class="bg-[#1a1f2e] p-8 rounded-2xl border border-gray-800">
        <h3 class="text-xl font-bold mb-6">🏆 Leaderboard</h3>
        <div class="space-y-4">
          <div v-for="(player, index) in leaderboard" :key="index" 
               class="flex justify-between items-center p-2 rounded-lg"
               :class="{'bg-blue-900/30 border border-blue-500/50': player.isMe}">
            <div class="flex items-center gap-3">
              <span class="text-gray-500 font-bold w-4">{{ index + 1 }}</span>
              <div class="w-8 h-8 bg-gray-600 rounded-full"></div>
              <span class="font-medium">{{ player.name }}</span>
            </div>
            <span class="text-gray-400 text-sm">{{ player.xp.toLocaleString() }} XP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
