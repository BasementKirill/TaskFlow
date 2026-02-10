<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useLeaderboard } from '../composables/useLeaderboard'
import { calculateStreak } from '../../../main/scripts/streakLogic' 
import { Trophy } from 'lucide-vue-next'

const { currentUser } = useAuth()
const { leaderboard, isLoading, generateDemoLeaderboard } = useLeaderboard()

const streak = ref(0) 

onMounted(() => {
  streak.value = calculateStreak()
  generateDemoLeaderboard()
  console.log("Streak aktualisiert:", streak.value)
})

// Helper to get rank suffix
const getRankSuffix = (rank: number) => {
  if (rank === 1) return 'st'
  if (rank === 2) return 'nd'
  if (rank === 3) return 'rd'
  return 'th'
}
</script>
<template>
  <div class="p-10">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold">Willkommen, {{ currentUser?.username }}! 👋</h1>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-s font-bold text-orange-400">🔥 {{ streak }} day streak</span>
        <div class="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div class="bg-purple-500 h-full" :style="{ width: '50%' }"></div>
        </div>
        <span class="text-s">250 / 500 XP</span>
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
        <h3 class="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy :size="24" class="text-yellow-400" />
          Leaderboard
        </h3>
        <div class="space-y-3">
          <div v-for="(player, index) in leaderboard" :key="player.id" 
               class="flex justify-between items-center p-3 rounded-xl transition-all hover:bg-gray-800/30"
               :class="{'bg-blue-900/30 border border-blue-500/50 shadow-lg shadow-blue-500/10': player.isMe}">
            <div class="flex items-center gap-3">
              <div class="relative">
                <!-- Rank Badge -->
                <div class="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10"
                     :class="{
                       'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900': index === 0,
                       'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900': index === 1,
                       'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900': index === 2,
                       'bg-gray-700 text-gray-300': index > 2
                     }">
                  {{ index + 1 }}
                </div>
                <!-- Avatar -->
                <div class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-700"
                     :class="{'ring-blue-500': player.isMe}">
                  <img :src="player.avatar_url" :alt="player.username" class="w-full h-full object-cover" />
                </div>
              </div>
              <span class="font-semibold text-sm" :class="{'text-blue-400': player.isMe}">
                {{ player.username }}
              </span>
            </div>
            <div class="text-right">
              <span class="text-gray-400 text-xs font-bold">{{ player.xp.toLocaleString() }}</span>
              <span class="text-gray-500 text-xs ml-1">XP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
