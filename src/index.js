import VueRecaptcha from './Recaptcha'
import { loadRecaptcha } from './autoload'

export { VueRecaptcha }

export default {
  install (Vue, options = {}) {
    Vue.component('vue-recaptcha', VueRecaptcha)
    VueRecaptcha.methods.loadRecaptcha = function () {
      loadRecaptcha(options.language)
    }
  }
}
