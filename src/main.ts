import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

createApp(App).use(router).use(Toast).mount('#app')
