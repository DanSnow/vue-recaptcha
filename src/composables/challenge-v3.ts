import { ref } from 'vue-demi'
import { useAssertV3SiteKey, useRecaptchaProxy } from './context'

export function useChallengeV3(action: string) {
  const siteKey = useAssertV3SiteKey()
  const proxy = useRecaptchaProxy()
  const response = ref<string>()

  return {
    response,
    async execute() {
      return (response.value = await proxy.execute(siteKey, { action }))
    },
  }
}
