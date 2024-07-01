import './assets/main.css'
import route from './routes/routes'

import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);
app.use(route);
app.use(pinia);
app.mount('#app');
