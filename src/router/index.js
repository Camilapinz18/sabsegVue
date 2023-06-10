import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import App from '../App.vue'
import MyAccountView from '../views/MyAccountView.vue'
import GenericView from '../views/GenericView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/account',
      name: 'account',
      component: MyAccountView
    },
    {
      path: '/generic',
      name: 'generic',
      component: GenericView
    }
  ]
})

export default router
