// import './assets/main.css'
// import '@/assets/style.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

//initial firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEHPfIRgo1NP4OgPSOuTOrHth3n8tY-O4",
  authDomain: "week7-siyu.firebaseapp.com",
  projectId: "week7-siyu",
  storageBucket: "week7-siyu.appspot.com",
  messagingSenderId: "336026097576",
  appId: "1:336026097576:web:1a5d28efa8d786bb082f9d"
};

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)
app.mount('#app')
