const URL =
  'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'

let loaded = false

export function loadRecaptcha (lang) {
  if (loaded) {
    return
  }
  loaded = true
  const $script = document.createElement('script')
  if (lang) {
    $script.src = URL + `&hl=${lang}`
  } else {
    $script.src = URL
  }
  $script.async = true
  document.head.appendChild($script)
}
