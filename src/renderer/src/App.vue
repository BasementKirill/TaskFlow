<script setup>
import { router } from './router'
const handleClose = () => window.electronAPI.closeWindow()
const handleMinimize = () => window.electronAPI.minimizeWindow()
</script>

<template>
  <div class="main-layout">
    <div class="window-controls">
      <button @click="handleMinimize" class="control-btn">─</button>
      <button @click="handleClose" class="control-btn close">✕</button>
    </div>

    <aside class="sidebar">
      <div class="drag-region">
        <span class="logo">TaskFlow 🚀</span>
      </div>
      <nav class="nav">
        <router-link to="/dashboard" class="item" active-class="active">Dashboard</router-link>
        <router-link to="/automations" class="item" active-class="active">Workflows</router-link>
      </nav>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
.nav { display: flex; flex-direction: column; padding: 10px; }
.item { 
  text-decoration: none; 
  color: white; 
  padding: 10px; 
  border-radius: 8px;
  margin-bottom: 5px;
}
.content { flex: 1; overflow-y: auto; background: #0f121d; }
</style>