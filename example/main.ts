import { createApp } from 'vue'
import App from './App.vue'
import { VueRecaptchaPlugin } from '../src'
import { createHead } from '@unhead/vue'

const app = createApp(App)

app.use(createHead())
app.use(VueRecaptchaPlugin, {
  // v2SiteKey: '6LeBHhcTAAAAALGH4-_9sXkLGaWToSIf6sg5Mcgj',
  v2SiteKey: '6Lc1tbIkAAAAAKzlAUh456wbsgY8f12n9FWLJq2F',
  v3SiteKey: '6LejC9kZAAAAAFQyq2IjCq0eK4g88GkixXr4_BGs',
})

app.mount('#root')
