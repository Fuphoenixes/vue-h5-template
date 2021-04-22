## 路由导航组件
### 功能：
1. 借助`keep-alive`组件实现仿原生app的，路由前进加载后退缓存功能
2. 借助`transition`组件实现仿原生app的，路由前进后退过渡动画
### 原理：
开发者先根据实际场景为每个路由设置层级，然后组件会在路由跳转时根据对应的层级判断是否缓存页面，以及如果展示过渡动画。
### 使用：
引入组件
```javascript
// main.js
import navigation from '@/components/navigation'

Vue.use(navigation)
```
使用组件
```vue
<!--App.vue-->
<template>
  <div id="app">
    <vue-navigation>
      <router-view />
    </vue-navigation>
  </div>
</template>
```
为每个路由设置层级 `level` <br/>
同时为保证 `keep-alive` 生效需为每个路由和对应组件设置一致且唯一的name
```javascript
// router.js
new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      meta: { level: 1 },
      component: () => import('@/views/list')
    },
    {
      path: '/detail',
      name: 'detail',
      meta: { level: 2 },
      component: () => import('@/views/detail')
    },
  ]
})
// 上例配置后，
// 从list页进入detail页，会缓存list页重新加载detail页，页面从右往左滑入
// 从detail页返回list页，会显示缓存的list页，销毁detail页，页面从左往右滑出
```
### API
 - `getCachedViewByName` <br/>
   功能：根据路由的name，获取被keep-alive缓存的页面的实例，若不存在则返回 undefined <br/>
   使用方法: `this.$getCachedViewByName(name)`
 
 - `clearCachedView` <br/>
   功能：清除指定页面或者所有页面的缓存 <br/>
   使用方法: `this.$clearCachedView(name|names|void)`
   
 - `setRouteTransitionName` <br/>
  功能：设置下一次路由跳转动画方式 <br/>
  使用方法: `this.$setRouteTransitionName(''|'slide-left'|'slide-right')`
   
### Hook
 - `afterRouteEnter` <br/>
   功能：为所有组件添加了`afterRouteEnter`钩子，用于在进入路由动画完成时触发。
