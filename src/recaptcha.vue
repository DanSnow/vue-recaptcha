<template>
  <div v-el:container></div>
</template>

<script>
  import * as recaptcha from './recaptcha.js';

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
    compiled() {
      let self = this;
      let opts = Object.assign({}, this.options, {
        callback: this.emitVerify,
        'expired-callback': this.emitExpired
      });
      recaptcha.render(this.$els.container, this.key, opts)
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
    }
  };
</script>
