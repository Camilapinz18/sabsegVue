import { createApp } from 'vue'

import naive from 'naive-ui'
import 'vfonts/Lato.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app=createApp(App)
app.use(router)
app.use(naive)
app.mount('#app')
//app.use(naive)
