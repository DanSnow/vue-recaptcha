import Vue from "vue"

interface Props {
  sitekey: string
  theme?: string
  badge?: string
  type?: string
  size?: string
  tabindex?: string
  loadRecaptchaScript?: boolean
  recaptchaScriptId?: string
  recaptchaHost?: string
  language?: string
}

declare class VueRecaptcha extends Vue {
  $props: Props
  execute(): void
  reset(): void
}

export { VueRecaptcha }
