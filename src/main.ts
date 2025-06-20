import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入全域樣式
import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')