<script setup>
    import { ref } from 'vue'

    const user = ref('BasementKirill')

    const handleClose = () => {
        console.log("Schließen gedrückt");
        window.electronAPI.closeWindow();
    }

    const handleMinimize = () => {
        window.electronAPI.minimizeWindow();
    }
</script>
<template>
  <div class="main-layout">
    <div class="window-controls">
      <button @click="handleMinimize" class="control-btn minimize">─</button>
      <button @click="handleClose" class="control-btn close">✕</button>
    </div>

    <aside class="sidebar">
      <div class="drag-region">
        <span class="logo">TaskFlow 🚀</span>
      </div>
      <nav class="nav">
        <div class="item active">Dashboard</div>
        <div class="item">Workflows</div>
      </nav>
    </aside>

    <main class="content">
      <h1>Willkommen bei TaskFlow, {{ user }} 💪</h1>
      <p>Hier um deine Produktivität aufs nächste Level zu bringen.</p>
    </main>
  </div>
</template>

<style>
html, body, #app { margin: 0; padding: 0; height: 100%; overflow: hidden; }

.main-layout { display: flex; height: 100vh; background: #0f172a; color: white; font-family: sans-serif; }

.sidebar { 
  background: darkblue; 
  -webkit-app-region: drag; 
}

.drag-region { padding: 40px 20px; }

.item { 
  padding: 10px; 
  margin-top: 5px;
  cursor: pointer;
  -webkit-app-region: no-drag; /* wichtig damit man clicken kann*/
}
.item:hover { background: lightblue; }

.item.active { background: blueviolet; }

.content {  padding: 20px; }

.window-controls {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  z-index: 10000;
  -webkit-app-region: no-drag; /* Buttons müssen klickbar sein! */
}

.control-btn {
  background: transparent;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.control-btn:hover { background: rgba(255, 255, 255, 0.1); }
.close:hover { background: #ef4444; } /* Rot beim Schließen */
</style>