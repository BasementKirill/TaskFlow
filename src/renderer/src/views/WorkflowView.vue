<script setup lang="ts">
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

const nodes = ref([
  { id: '1', type: 'input', label: 'Start Trigger', position: { x: 250, y: 5 } },
])
const edges = ref([])
</script>

<template>
  <div class="h-full w-full bg-[#0f121d]">
    <VueFlow :nodes="nodes" :edges="edges" class="bg-[#0f121d]">
      <Background pattern-color="#2a2f3e" :gap="20" />
      <Controls />
    </VueFlow>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
</style>