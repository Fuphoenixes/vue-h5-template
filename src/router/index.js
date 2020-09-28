import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      meta: { level: 1 },
      component: ()=>import('@/views/Shop')
    },
    {
      path: '/swiper',
      name: 'swiper',
      meta: { level: 2 },
      component: ()=>import('@/views/Swiper')
    },
    {
      path: '/push',
      name: 'push',
      meta: { level: 2 },
      component: ()=>import('@/views/push')
    },
    {
      path: '/404',
      name: '404',
      meta: { level: Number.MAX_VALUE },
      component: ()=>import('@/views/404')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
