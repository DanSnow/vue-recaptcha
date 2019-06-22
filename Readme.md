vue-recaptcha
=============
[![Greenkeeper badge](https://badges.greenkeeper.io/DanSnow/vue-recaptcha.svg)](https://greenkeeper.io/)
[![devDependencies Status](https://david-dm.org/DanSnow/vue-recaptcha/dev-status.svg)](https://david-dm.org/DanSnow/vue-recaptcha?type=dev)
[![peerDependencies Status](https://david-dm.org/DanSnow/vue-recaptcha/peer-status.svg)](https://david-dm.org/DanSnow/vue-recaptcha?type=peer)
[![CircleCI](https://circleci.com/gh/DanSnow/vue-recaptcha.svg?style=shield)](https://circleci.com/gh/DanSnow/vue-recaptcha)
[![npm version](https://img.shields.io/npm/v/vue-recaptcha.svg?style=flat)](https://www.npmjs.com/package/vue-recaptcha)
[![npm downloads](https://img.shields.io/npm/dm/vue-recaptcha.svg?style=flat)](https://www.npmjs.com/package/vue-recaptcha)

<a href="https://www.buymeacoffee.com/4bLIeMVjZ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

Description
-----------

**Notice:** The document on github is always reference to master branch. For stable version, please read the document at [NPM](https://www.npmjs.com/package/vue-recaptcha).

Google ReCAPTCHA component for vue.
If you like this package, please leave a star on github.

This version is for Vue 2.0. If you need Vue 1.x support please reference to [vue-v1.x][vue-v1.x].

### reCAPTCHA V3

**Notice**: This project currently not supporting reCAPTCHA v3.

<!-- TOC -->

- [Description](#description)
- [Install](#install)
  - [NPM](#npm)
  - [CDN](#cdn)
- [Usage](#usage)
  - [Get started](#get-started)
  - [Bind Challenge to Button](#bind-challenge-to-button)
  - [Auto-load `<script>`](#auto-load-script)
- [API](#api)
  - [Props](#props)
  - [Methods](#methods)
  - [Events](#events)
- [FAQ](#faq)
  - [What is "ReCAPTCHA couldn't find user-provided function: vueRecaptchaApiLoaded"?](#what-is-recaptcha-couldnt-find-user-provided-function-vuerecaptchaapiloaded)
  - [How to test vue-recaptcha?](#how-to-test-vue-recaptcha)
  - [How about an e2e testing (or integration testing)?](#how-about-an-e2e-testing-or-integration-testing)

<!-- /TOC -->

[vue-v1.x]: https://github.com/DanSnow/vue-recaptcha/tree/vue-v1.x

## Install ##

### NPM ###

```shell
$ npm install --save vue-recaptcha
```

### CDN ###
```html
<script src="https://unpkg.com/vue-recaptcha@latest/dist/vue-recaptcha.js"></script>
<!-- Minify -->
<script src="https://unpkg.com/vue-recaptcha@latest/dist/vue-recaptcha.min.js"></script>
```

## Usage ##

### Get started ###
Place this in head to load reCAPTCHA:
```html
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
</script>
```
```
With `onload` callback, it will notify us when the api is ready for use.
```

Then include `vue-recaptcha` in your app.

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

### Auto-load `<script>`

If `loadRecaptchaScript` props is set to `true`, vue-recaptcha will inject the required `<script>` tag. This means that manually placing the `<script>` tag is unneccessary.

```vue
<template>
  <vue-recaptcha sitekey="Your key here" :loadRecaptchaScript="true"></vue-recaptcha>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    ...
    components: { VueRecaptcha }
  };
</script>
```

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
- loadRecaptchaScript (optional)  
  If `loadRecaptchaScript` is set to `true`, vue-recaptcha will inject the required `<script>` tag  
  Default: `false`
- recaptchaHost (optional)  
  Set this to change the reCAPTCHA domain if neccessary, as described in [ReCAPTCHA support][recaptcha-global]  
  Default: `www.google.com`
- recaptchaScriptId (optional)  
  Set this to change the injected `<script>` id. This should only be changed if it conflicts with existing id  
  Default: `__RECAPTCHA_SCRIPT`

For more information, please reference to [ReCAPTCHA document][recaptcha-params] and [Invisible ReCAPTCHA document][invisible-recaptcha-params].  

### Methods ###

- reset  
  Reset reCAPTCHA instance
- execute  
  Invoke reCAPTCHA challenge

### Events ###

- verify(response)
  Emit on reCAPTCHA verified
  `response` is the successful reCAPTCHA response
- expired()
  Emit on reCAPTCHA expired
- render(id)
  Emit on reCAPTCHA mounted on DOM 
  `id` is the widget id of the component

## FAQ ##

### What is "ReCAPTCHA couldn't find user-provided function: vueRecaptchaApiLoaded"? ###

It's because google's recaptcha have been loaded before your app.
You can simply ignore it because vue-recaptcha can still detect and render recaptcha.
If you care about this, try to move the script tag of recatpcha after to your app.

### How to test vue-recaptcha? ###

You can mock `window.grecaptcha` to bypass google's recaptcha.
Here is an [example](example/__tests__/example.spec.js) which work with [jest](https://facebook.github.io/jest/).

### How about an e2e testing (or integration testing)? ###

Please refernece to [recaptcha's faq](https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha-v2-what-should-i-do).

[example]: https://github.com/DanSnow/vue-recaptcha/tree/master/example
[recaptcha-params]: https://developers.google.com/recaptcha/docs/display#render_param
[invisible-recaptcha-params]: https://developers.google.com/recaptcha/docs/invisible#render_param
[recaptcha-global]: https://developers.google.com/recaptcha/docs/faq#can-i-use-recaptcha-globally
