
const routes = [
  {
    path: '/',
    name: 'home',
    meta: { level: 1 },
    component: () => import('@/views/home')
  },
  {
    path: '/404',
    name: '404',
    meta: { level: Number.MAX_VALUE },
    component: () => import('@/views/404')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default routes
