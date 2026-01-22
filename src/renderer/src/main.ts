import { createApp, createTextVNode } from 'vue';
import App from './App.vue';
import { router } from './router'

const app = createApp(App)
App.use(router)

createApp(App).mount('#app');

