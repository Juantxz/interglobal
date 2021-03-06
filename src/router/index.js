import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Principal from '@/components/Principal'
import Buscar from '@/components/Buscar'

import firebase from 'firebase'
import Prestamo from '@/components/Prestamo'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/principal/prestamo',
      name: 'login',
      component: Login
    },
    {
      path: '/principal',
      name: 'Principal',
      component: Principal,
      meta: {
        requiresAuth: true
      },
      children: [
        {
        path: "Prestamo",
        component: Prestamo
      },
      {
        path:"Buscar",
        component:Buscar
      }
    ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('principal')
  else next()
})
export default router
