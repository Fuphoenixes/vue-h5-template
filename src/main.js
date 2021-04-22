import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'
import '@/icons' // icon

import vant from './vant'
import Navigation from '@/components/Navigation'
import loadingPlugin from 'v-loading-plugin'

Vue.use(vant)
Vue.use(Navigation)
Vue.use(loadingPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
