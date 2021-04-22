import {
  Lazyload,
  Toast,
  Button,
  Empty
} from 'vant'
import 'vant/lib/icon/local.css'

// Toast.allowMultiple()

const vant = Vue => {
  Vue.use(Lazyload)
  Vue.use(Toast)
  Vue.use(Empty)
  Vue.use(Button)
}

export default vant
