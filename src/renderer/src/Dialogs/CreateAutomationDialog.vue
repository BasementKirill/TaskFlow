<script setup lang="ts">
import { ref } from 'vue'
import { Zap, Keyboard, Clock } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['update:open', 'create'])

const name = ref('')
const trigger = ref('manual')

const handleCreate = () => {
  if (name.value) {
    emit('create', { name: name.value, trigger: trigger.value })
    emit('update:open', false)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[525px] bg-[#0f121d] border-gray-800 text-white">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">New Automation</DialogTitle>
        <DialogDescription class="text-gray-400">
          Give your automation a name and choose how it starts.
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-6 py-4">
        <div class="grid gap-2">
          <Label for="name" class="text-gray-400">Automation Name</Label>
          <Input id="name" v-model="name" placeholder="e.g. Morning Focus" class="bg-[#1a1f2e] border-gray-800 focus:ring-blue-500" />
        </div>

        <div class="grid gap-2">
          <Label class="text-gray-400">Trigger Type</Label>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="t in ['manual', 'keyboard', 'scheduled']" 
              :key="t"
              @click="trigger = t"
              type="button"
              :class="trigger === t ? 'bg-blue-600 border-blue-500' : 'bg-[#1a1f2e] border-gray-800 hover:bg-gray-800'"
              class="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all"
            >
              <Zap v-if="t === 'manual'" :size="20" />
              <Keyboard v-if="t === 'keyboard'" :size="20" />
              <Clock v-if="t === 'scheduled'" :size="20" />
              <span class="text-xs font-medium capitalize">{{ t }}</span>
            </button>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="ghost" @click="emit('update:open', false)" class="text-gray-400 hover:text-white">Cancel</Button>
        <Button @click="handleCreate" :disabled="!name" class="bg-blue-600 hover:bg-blue-500 text-white px-8">
          Build Workflow
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>