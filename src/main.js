import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'

import './assets/font_deznx2kadpk/iconfont.css'
import './assets/font_deznx2kadpk/iconfont.js'
const app = createApp(App)
app.use(router)
app.mount('#app')
app.config.globalProperties.$http = http

