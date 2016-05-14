vue-recaptcha
=============
[![devDependency Status](https://david-dm.org/DanSnow/vue-recaptcha/dev-status.svg)](https://david-dm.org/DanSnow/vue-recaptcha#info=devDependencies)
[![peerDependency Status](https://david-dm.org/DanSnow/vue-recaptcha/peer-status.svg)](https://david-dm.org/DanSnow/vue-recaptcha#info=peerDependencies)

## Description ##
Google ReCAPTCHA component for vue.

## Install ##

```shell
$ npm install git+https://github.com/DanSnow/vue-recaptcha.git
```

## Usage ##

Plase this in head to load recaptcha:
```html
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
</script>
```
```
With `onload` callback, it will notify us when the api is ready for use.
```

Then use it in your component
```vue
<template>
  <vue-recaptcha key="Your key here"></vue-recaptcha>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    ...
    components: { VueRecaptcha }
  };
</script>
```
