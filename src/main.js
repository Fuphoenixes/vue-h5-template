import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'
import '@/icons' // icon

import { Lazyload, Toast as VantTost, Dialog } from 'vant';
import Toast from '@/components/Toast'
import loadingPlugin from "v-loading-plugin";
import afterRouteEnter from '@/mixins/afterRouteEnter'

Vue.use(Lazyload);
Vue.use(VantTost);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(loadingPlugin);

Vue.mixin(afterRouteEnter);

Vue.config.productionTip = false;

//事件总线
Vue.prototype.$bus = new Vue({});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
