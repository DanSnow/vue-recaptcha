import { defineComponent, h, onMounted, ref } from 'vue-demi'

import recaptcha from './recaptcha-wrapper'

export default defineComponent({
  name: 'VueRecaptcha',
  props: {
    sitekey: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
    },
    badge: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
      type: String,
    },
    tabindex: {
      type: String,
    },
    loadRecaptchaScript: {
      type: Boolean,
      default: true,
    },
    recaptchaScriptId: {
      type: String,
      default: '__RECAPTCHA_SCRIPT',
    },
    recaptchaHost: {
      type: String,
      default: 'www.google.com',
    },
    language: {
      type: String,
      default: '',
    },
  },
  emits: ['render', 'verify', 'expired', 'error'],

  setup(props, { slots, emit }) {
    const root = ref(null)
    const widgetId = ref(null)

    const emitVerify = (response) => {
      emit('verify', response)
    }
    const emitExpired = () => {
      emit('expired')
    }
    const emitError = () => {
      emit('error')
    }

    onMounted(() => {
      recaptcha.checkRecaptchaLoad()

      if (props.loadRecaptchaScript) {
        if (!document.getElementById(props.recaptchaScriptId)) {
          // Note: vueRecaptchaApiLoaded load callback name is per the latest documentation
          const script = document.createElement('script')
          script.id = props.recaptchaScriptId
          script.src = `https://${props.recaptchaHost}/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl=${props.language}`
          script.async = true
          script.defer = true

          document.head.appendChild(script)
        }
      }

      const opts = {
        ...props,
        callback: emitVerify,
        'expired-callback': emitExpired,
        'error-callback': emitError,
      }
      const $root = root.value
      const container = slots.default ? $root.children[0] : $root
      recaptcha.render(container, opts, (id) => {
        widgetId.value = id
        emit('render', id)
      })
    })

    return {
      root,
      widgetId,
      reset() {
        recaptcha.reset(widgetId.value)
      },
      execute() {
        recaptcha.execute(widgetId.value)
      },
    }
  },
  render() {
    const defaultSlot = this.$slots.default
    let defaultContent
    if (typeof defaultSlot === 'function') {
      defaultContent = defaultSlot()
    } else {
      defaultContent = defaultSlot
    }
    return h('div', { ref: 'root' }, defaultContent)
  },
})
