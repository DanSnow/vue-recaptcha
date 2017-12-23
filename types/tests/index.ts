import Vue from 'vue'
import VueRecaptcha from '../'

const app = new Vue({
  render (h) {
    return h(VueRecaptcha, {props: {sitekey: 'foo'}})
  }
})
