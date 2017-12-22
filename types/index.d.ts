import Vue from 'vue'

declare class VueRecaptcha extends Vue {
  sitekey: string
  theme?: string
  badge?: string
  type?: string
  size?: string
  tabindex?: string

  reset(): void
  execute(): void
}

export default VueRecaptcha
