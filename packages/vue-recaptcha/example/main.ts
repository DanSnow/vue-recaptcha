import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { VueRecaptchaPlugin } from '../src'
import App from './App.vue'

const app = createApp(App)

app.use(createHead())
app.use(VueRecaptchaPlugin, {
  v2SiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  v3SiteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs',
})

app.mount('#root')
