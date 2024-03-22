import { onMounted } from 'vue-demi'
import { checkRecaptchaLoad } from '../script-manager/common'
import { warn } from '../utils'
import { useRecaptchaContext } from './context'

export interface UseRecaptchaProviderInput {
  _warnMessage?: string
}

export function useRecaptchaProvider() {
  const ctx = useRecaptchaContext()

  if (ctx.scriptInjected) {
    warn('`useRecaptchaProvider` is used multiple time')
  } else {
    ctx.scriptInjected = true
    ctx.useScriptProvider()

    onMounted(() => {
      checkRecaptchaLoad()
    })
  }
}
