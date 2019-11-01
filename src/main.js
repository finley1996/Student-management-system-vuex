import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import VueParticles from 'vue-particles'  
Vue.config.productionTip = false
//路由守卫（全局前置钩子）
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('lgtoken') || ''
  if(token){
    next()
  }else{
    if(to.path == "/login" || to.path == "/regist"){
      next()
    }else{
      next({path:'/login'})
    }
  }
  
})
Vue.use(ElementUI)
Vue.use(VueParticles) 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
