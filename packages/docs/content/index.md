---
title: vue-recaptcha document
navigation: false
layout: page
---

::u-page-hero
---
links:
  - label: Get Started
    to: /guide
    color: primary
  - label: Open on GitHub →
    to: https://github.com/DanSnow/vue-recaptcha
    target: _blank
    color: neutral
    variant: subtle
---

#title
vue-recaptcha

#description
Make Google's reCAPTCHA easy to use in Vue.js/Nuxt.js
::

::tabs
  :::tabs-item{label="Preview"}

  :recaptcha-checkbox

  :::

  :::tabs-item{label="Code"}
  ```vue
  <template>
    <Checkbox />
  </template>
  ```
  :::
::

:::card-group
  ::card
  ---
  title: reCAPTCHA v2
  ---
  The "I'm not a robot" checkbox
  ::
  ::card
  ---
  title: reCAPTCHA v3
  ---
  Determinate if user is human without interrupt the user flow
  ::
  ::card
  ---
  title: Nuxt integration
  ---
  Use reCAPTCHA in Nuxt.js
  ::
:::
