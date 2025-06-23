import HomePage from '@/views/HomePage.vue'
import MessagePage from '@/views/MessagePage.vue'
import RegistrationPage from '@/views/RegistrationPage.vue'
import ShoppingPage from '@/views/ShoppingPage.vue'
import TodoPage from '@/views/TodoPage.vue'
import UserInputPage from '@/views/UserInputPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/todo', name: 'Todo', component: TodoPage },
    { path: '/cart', name: 'Cart', component: ShoppingPage },
    { path: '/register', name: 'Register', component: RegistrationPage },
    {
      path: '/messages-login',
      name: 'MessageLogin',
      component: UserInputPage
    },
    {
      path: '/messages',
      name: 'MessageBoard',
      component: MessagePage,
      // 路由導航守衛
      beforeEnter: (to, from, next) => {
        const username = localStorage.getItem('username');
        if (!username) {
          next({ name: 'MessageLogin' });
        } else {
          next();
        }
      },
    },
  ]
})

export default router