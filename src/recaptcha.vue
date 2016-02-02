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
        default: {}
      }
    },
    created() {
      recaptcha.checkRecaptchaLoad();
    },
    compiled() {
      let self = this;
      recaptcha.render(this.$els.container, this.key, this.options)
        .then((id) => {
          widgetId = id;
          self.$emit('render', widgetId);
        });
    },
    methods: {
      reset() {
        recaptcha.reset(widgetId);
      }
    }
  };
</script>
