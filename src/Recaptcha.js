import assign from 'object-assign';
import recaptcha from './recaptcha.js';

export default {
  props: {
    sitekey: {
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
    this.$widgetId = null;
    recaptcha.checkRecaptchaLoad();
  },
  mounted() {
    const self = this;
    const opts = assign({}, this.options, {
      callback: this.emitVerify,
      'expired-callback': this.emitExpired
    });
    recaptcha.render(this.$refs.container, this.sitekey, opts, (id) => {
      self.$widgetId = id;
      self.$emit('render', id);
    });
  },
  methods: {
    reset() {
      recaptcha.reset(this.$widgetId);
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
