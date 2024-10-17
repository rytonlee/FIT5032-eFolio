import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import { isAuthenticated } from '../auth'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import LogoutView from '@/views/LogoutView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'; 
import CountBookAPI from '@/views/CountBookAPI.vue'; 


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/GetBookCount',
      name: 'GetBookCount',
      component: GetBookCountView
    },
  
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/CountBookAPI',
      name: 'CountBookAPI',
      component: CountBookAPI
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/WeatherView',
      name: 'WeatherView',
      component: WeatherView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated.value) {
          next('/access-denied')
        } else {
          next()
        }
      }
    },
    {
      path: '/access-denied',
      name: 'AccessDenied',
      component: AccessDenied
    },
    {
      path: '/FireRegister',
      name: 'FireRegister',
      component: FirebaseRegisterView
    },
    {
      path: '/FireLogin',
      name: 'FireLogin',
      component: FirebaseSigninView
    },
    {
      path: '/addbook',
      name: 'AddBook',
      component: AddBookView
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView
    }
  ]
})

export default router
