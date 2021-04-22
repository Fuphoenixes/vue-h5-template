import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  // 阻止返回上一页
  if (window.__NOT_ALLOWED_BACK__) {
    next(false)
    return
  }
  next()
})

export default router
