import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'vue3-carousel/dist/carousel.css';
import { createPinia } from 'pinia'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


import store from './store'

const pinia = createPinia()
const app = createApp(App)
app.use(Toast);

app.use(router)
app.use(store)
app.use(pinia)

app.mount('#app')
