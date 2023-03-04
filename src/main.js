import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store_admin from "@/store/modules/admin"


const app = createApp(App)

app.use(router)
app.use(store_admin)

app.mount('#app_admin')
