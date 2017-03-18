import recaptcha from './recaptcha-wrapper'

export default {
  name: 'VueRecaptcha',
  props: {
    sitekey: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    this.$widgetId = null
  },
  mounted () {
    recaptcha.checkRecaptchaLoad()

    const opts = {
      ...this.options,
      callback: this.emitVerify,
      'expired-callback': this.emitExpired
    }
    recaptcha.render(this.$refs.container, this.sitekey, opts, (id) => {
      this.$widgetId = id
      this.$emit('render', id)
    })
  },
  methods: {
    reset () {
      recaptcha.reset(this.$widgetId)
    },
    emitVerify (response) {
      this.$emit('verify', response)
    },
    emitExpired () {
      this.$emit('expired')
    }
  },
  events: {
    recaptchaReset () {
      this.reset()
    }
  },
  render (h) {
    return (
      <div ref='container' />
    )
  }
}
