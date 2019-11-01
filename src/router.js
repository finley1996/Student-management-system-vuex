import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Management from './components/home/management'
import Login from './pages/Login.vue'
import Welcome from './components/home/welcome'
import Regist from './pages/Regist.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/login',
      component: Home,
      children: [
        {
          path: 'Management',
          name: 'Management',
          component: Management
        }, {
          path: 'Welcome',
          name: 'Welcome',
          component: Welcome
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/regist',
      name:'regist',
      component:Regist
    }
  ]
})
