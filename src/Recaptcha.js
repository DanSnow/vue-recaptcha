import recaptcha from './recaptcha-wrapper'

export default {
  name: 'VueRecaptcha',
  props: {
    sitekey: {
      type: String,
      required: true
    },
    theme: {
      type: String
    },
    badge: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    tabindex: {
      type: String
    }
  },
  mounted () {
    recaptcha.checkRecaptchaLoad()
    const opts = {
      ...this.$props,
      callback: this.emitVerify,
      'expired-callback': this.emitExpired
    }
    const container = this.$slots.default ? this.$el.children[0] : this.$el
    recaptcha.render(container, opts, id => {
      this.$widgetId = id
      this.$emit('render', id)
    })
  },
  methods: {
    reset () {
      recaptcha.reset(this.$widgetId)
    },
    execute () {
      recaptcha.execute(this.$widgetId)
    },
    emitVerify (response) {
      this.$emit('verify', response)
    },
    emitExpired () {
      this.$emit('expired')
    }
  },
  render (h) {
    return h('div', {}, this.$slots.default)
  }
}
