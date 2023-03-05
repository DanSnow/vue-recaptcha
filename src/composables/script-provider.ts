import { onMounted } from 'vue-demi'
import { useRecaptchaContext } from './context'
import { checkRecaptchaLoad } from '../script-manager/common'
import { warn } from '../utils'

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
