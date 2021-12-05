vue-recaptcha
=============
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

This version is for Vue 3 and 2.

### reCAPTCHA V3

**Notice**: This project currently not supporting reCAPTCHA v3.

<!-- TOC -->

- [vue-recaptcha](#vue-recaptcha)
  - [Description](#description)
    - [reCAPTCHA V3](#recaptcha-v3)
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

## Install ##

### NPM ###

```shell
$ npm install --save vue-recaptcha
```

### Yarn ###

```shell
$ yarn add vue-recaptcha
```

### CDN ###
```html
<!-- Make sure you load the vue-demi first -->
<script src="https://unpkg.com/vue-demi@0.12.1/lib/index.iife.js"></script>

<!-- Then load vue-recaptcha -->
<script src="https://unpkg.com/vue-recaptcha@^2/dist/vue-recaptcha.js"></script>
<!-- Minify -->
<script src="https://unpkg.com/vue-recaptcha@^2/dist/vue-recaptcha.min.js"></script>
```

## Usage ##

### Get started ###
Include `vue-recaptcha` in your app.

```vue
<template>
  <vue-recaptcha sitekey="Your key here"></vue-recaptcha>
</template>

<script>
  import { VueRecaptcha } from 'vue-recaptcha';
  export default {
    ...
    components: { VueRecaptcha }
  };
</script>
```

### Manually call challenge ###

```vue
<template>
  <vue-recaptcha ref="recaptcha" sitekey="Your key here" />
</template>

<script>
  import { VueRecaptcha } from 'vue-recaptcha';
  export default {
    components: { VueRecaptcha }

    methods: {
      onEvent() {
        // when you need a reCAPTCHA challenge
        this.$refs.recaptcha.execute();
      }
    }
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
  import { VueRecaptcha } from 'vue-recaptcha';
  export default {
    ...
    components: { VueRecaptcha }
  };
</script>
```

**Notice:** You could only place ONE element as `vue-recaptcha` child.

For more information, please reference to [example](example)

## API ##

### Props ###
- `sitekey` (required) –
  ReCAPTCHA site key
- `theme` (optional) –
  The color theme for reCAPTCHA
- `type` (optional) –
  The type of reCAPTCHA
- `size` (optional) –
  The size of reCAPTCHA
- `tabindex` (optional) –
  The tabindex of reCAPTCHA
- `badge` (optional) (Invisible ReCAPTCHA only) –
  Position of the reCAPTCHA badge
- `loadRecaptchaScript` (optional) –
  If `loadRecaptchaScript` when set this to `true`, vue-recaptcha will inject the required `<script>` tag automatically.
  Disable this by setting this to `false`, and you need to inject the `<script>` tag manually. Please refer to [Manually load script](#manually-load-script) for more information.
  Default: `true`

The following props will only work when `loadRecaptchaScript` is set as `true`

- `recaptchaHost` (optional) –
  Set this to change the reCAPTCHA domain if neccessary, as described in [ReCAPTCHA support][recaptcha-global]
  Default: `www.google.com`
- `recaptchaScriptId` (optional) –
  Set this to change the injected `<script>` id. This should only be changed if it conflicts with existing id
  Default: `__RECAPTCHA_SCRIPT`
- `language` (optional) –
  Set this to change the reCAPTCHA language if necessary, as described in [ReCAPTCHA support][recaptcha-global]
  Default: '' `// user browser language by default`  
  **Notice**: It'll not work as you expecting when you change this props dynamically. Since it's impossible to change the language without a full page reloading

For more information, please reference to [ReCAPTCHA document][recaptcha-params] and [Invisible ReCAPTCHA document][invisible-recaptcha-params].

### Methods ###

- `reset` –
  Reset reCAPTCHA instance
- `execute` –
  Invoke reCAPTCHA challenge

### Events ###

- `verify(response)` –
  Emit on reCAPTCHA verified
  `response` is the successful reCAPTCHA response
- `expired()` –
  Emit on reCAPTCHA expired
- `render(id)` –
  Emit on reCAPTCHA mounted on DOM
  `id` is the widget id of the component
- `error()` –
  Emit when reCAPTCHA encounters an error

  ```html
  <vue-recaptcha
    :siteKey="siteKey"
    @verify="verifyMethod"
    @expired="expiredMethod"
    @render="renderMethod"
    @error="errorMethod">
  </vue-recaptcha>
  ```
## FAQ ##

### What is "ReCAPTCHA couldn't find user-provided function: vueRecaptchaApiLoaded"? ###

It's because google's recaptcha have been loaded before your app.
You can simply ignore it because vue-recaptcha can still detect and render recaptcha.
If you care about this, try to move the script tag of recatpcha after to your app.

### How to test vue-recaptcha? ###

You can mock `window.grecaptcha` to bypass google's recaptcha.
Here is an [example](example/__tests__/example.spec.js) which work with [jest](https://facebook.github.io/jest/).

### How about an e2e testing (or integration testing)? ###

Please reference to [recaptcha's FAQ](https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha-v2-what-should-i-do).

### Manually load `<script>`

Place this in head to load reCAPTCHA:
```html
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
</script>
```
```
With `onload` callback, it will notify us when the api is ready for use.
```

[example]: https://github.com/DanSnow/vue-recaptcha/tree/master/example
[recaptcha-params]: https://developers.google.com/recaptcha/docs/display#render_param
[invisible-recaptcha-params]: https://developers.google.com/recaptcha/docs/invisible#render_param
[recaptcha-global]: https://developers.google.com/recaptcha/docs/faq#can-i-use-recaptcha-globally
