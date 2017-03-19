vue-recaptcha
=============
[![Greenkeeper badge](https://badges.greenkeeper.io/DanSnow/vue-recaptcha.svg)](https://greenkeeper.io/)
[![devDependencies Status](https://david-dm.org/DanSnow/vue-recaptcha/dev-status.svg)](https://david-dm.org/DanSnow/vue-recaptcha?type=dev)
[![peerDependencies Status](https://david-dm.org/DanSnow/vue-recaptcha/peer-status.svg)](https://david-dm.org/DanSnow/vue-recaptcha?type=peer)
[![CircleCI](https://circleci.com/gh/DanSnow/vue-recaptcha.svg?style=shield)](https://circleci.com/gh/DanSnow/vue-recaptcha)
[![npm version](https://img.shields.io/npm/v/vue-recaptcha.svg?style=flat)](https://www.npmjs.com/package/vue-recaptcha)
[![npm downloads](https://img.shields.io/npm/dm/vue-recaptcha.svg?style=flat)](https://www.npmjs.com/package/vue-recaptcha)

## Description ##
Google ReCAPTCHA component for vue.

This version is for Vue 2.0. If you need Vue 1.x support please reference to [vue-v1.x][vue-v1.x].

[vue-v1.x]: https://github.com/DanSnow/vue-recaptcha/tree/vue-v1.x

## Install ##

### NPM ###

```shell
$ npm install vue-recaptcha
```

### CDN ###
```html
<script src="https://unpkg.com/vue-recaptcha@latest/dist/vue-recaptcha.js"></script>
<!-- Minify -->
<script src="https://unpkg.com/vue-recaptcha@latest/dist/vue-recaptcha.min.js"></script>
```

## Usage ##

### General ###
Place this in head to load reCAPTCHA:
```html
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
</script>
```
```
With `onload` callback, it will notify us when the api is ready for use.
```

### Normal ReCAPTCHA ###
```vue
<template>
  <vue-recaptcha sitekey="Your key here"></vue-recaptcha>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    ...
    components: { VueRecaptcha }
  };
</script>
```

### Bind Challenge to Button ###
```vue
<template>
  <vue-recaptcha sitekey="Your key here">
    <button>Click me</button>
  </vue-recaptcha>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    ...
    components: { VueRecaptcha }
  };
</script>
```

**Notice:** You could only place one element as `vue-recaptcha` child.

For more information, please reference to [example](example)

## API ##

### Props ###
- sitekey (required)  
  ReCAPTCHA site key
- theme (optional)  
  The color theme for reCAPTCHA
- type (optional)  
  The type of reCAPTCHA
- size (optional)  
  The size of reCAPTCHA
- tabindex (optional)  
  The tabindex of reCAPTCHA
- badge (optional) (Invisible ReCAPTCHA only)  
  Position of the reCAPTCHA badge

For more information, please reference to [ReCAPTCHA document](recaptcha-params) and [Invisible ReCAPTCHA document](invisible-recaptcha-params).  

### Methods ###
- reset  
  Reset reCAPTCHA instance
- execute  
  Invoke reCAPTCHA challenge

### Events ###
- recaptchaReset
  Reset ReCAPTCHA instance

[example]: https://github.com/DanSnow/vue-recaptcha/tree/master/example
[recaptcha-params]: https://developers.google.com/recaptcha/docs/display#render_param
[invisible-recaptcha-params]: https://developers.google.com/recaptcha/docs/invisible#render_param
