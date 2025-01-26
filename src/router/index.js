import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import clientPage from '../views/clientPage.vue'
import signup from '../views/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/clientPage',
    name: 'clientPage',
    component: clientPage
  },

  {
    path: '/SignUp',
    name: 'SignUp',
    component: signup
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
