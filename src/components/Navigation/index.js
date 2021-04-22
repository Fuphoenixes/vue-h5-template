import VueNavigation from './VueNavigation'
import afterRouteEnter from './afterRouteEnter'
import { getCachedViewByName, clearCachedView } from './cachedViews'
import setRouteTransitionName from './setRouteTransitionName'

const Navigation = {
  install(Vue) {
    Vue.prototype.$navigationBus = new Vue({})
    Vue.component('vue-navigation', VueNavigation)
    Vue.mixin(afterRouteEnter)
    Vue.prototype.$getCachedViewByName = getCachedViewByName
    Vue.prototype.$clearCachedView = clearCachedView
    Vue.prototype.$setRouteTransitionName = setRouteTransitionName
  }
}

export default Navigation
