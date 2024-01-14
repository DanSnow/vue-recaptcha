import type { Ref } from 'vue-demi'
import { ref } from 'vue-demi'
import { useAssertV3SiteKey, useRecaptchaProxy } from './context'

export interface UseChallengeV3Return {
  /**
   * reCAPTCHA v3 response as ref
   */
  response: Ref<string | undefined>
  /**
   * Execute the challenge
   * @returns response for reCAPTCHA v3
   */
  execute: () => Promise<string>
}

export function useChallengeV3(action: string): UseChallengeV3Return {
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
