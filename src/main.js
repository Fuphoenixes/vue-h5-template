import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'

import { Lazyload, Toast, Dialog } from 'vant';
import loadingPlugin from '@/mixins/loadingPlugin'
import afterRouteEnter from '@/mixins/afterRouteEnter'

Vue.use(Lazyload);
Vue.use(Toast);
Vue.use(Dialog);

Vue.mixin(afterRouteEnter);
Vue.mixin(loadingPlugin);

Vue.config.productionTip = false;

//事件总线
Vue.prototype.$bus = new Vue({});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
