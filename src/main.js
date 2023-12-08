
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import { createPinia } from 'pinia';
import { setupCartStore } from './store/cart';
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
const pinia = createPinia();
registerPlugins(app)
app.use(pinia);
const cartStore = setupCartStore(pinia);
app.mount('#app')
