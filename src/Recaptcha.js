import recaptcha from './recaptcha.js';

let widgetId = null;

export default {
  props: {
    key: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    recaptcha.checkRecaptchaLoad();
  },
  mounted() {
    const self = this;
    const opts = Object.assign({}, this.options, {
      callback: this.emitVerify,
      'expired-callback': this.emitExpired
    });
    recaptcha.render(this.$refs.container, this.key, opts)
      .then((id) => {
        widgetId = id;
        self.$emit('render', widgetId);
      });
  },
  methods: {
    reset() {
      recaptcha.reset(widgetId);
    },
    emitVerify(response) {
      this.$emit('verify', response);
    },
    emitExpired() {
      this.$emit('expired');
    }
  },
  events: {
    recaptchaReset() {
      this.reset();
    }
  },
  render(h) {
    return (
      <div ref="container"></div>
    );
  }
};
