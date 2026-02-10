import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import { router } from './router';
import { useAuth } from './composables/useAuth';

const app = createApp(App);

app.use(router);

// Initialize auth state from localStorage
const { initAuth } = useAuth();
initAuth();

app.mount('#app');
