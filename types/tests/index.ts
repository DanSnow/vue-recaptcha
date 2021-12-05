import { createApp, h } from 'vue'
import { VueRecaptcha } from '../'

createApp({
  render() {
    return h(VueRecaptcha, { sitekey: 'foo' })
  },
})
