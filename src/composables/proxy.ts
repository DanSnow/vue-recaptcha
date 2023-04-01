import type { Ref } from 'vue-demi'
import { invariant } from '../utils'
import type { GRecaptcha, RecaptchaV2Options, WidgetID } from '../script-manager/common'
import { recaptchaLoaded } from '../script-manager/common'

export interface RecaptchaProxy {
  render(ele: Element, options: RecaptchaV2Options): Promise<WidgetID>
  reset(widgetId?: WidgetID | undefined): void
  execute(siteKey: string, options: { action: string }): Promise<string>
  execute(widgetId?: WidgetID | undefined): void
}

export function createRecaptchaProxy(isReady: Ref<boolean>, getRecaptcha: () => GRecaptcha): RecaptchaProxy {
  function assertLoaded() {
    invariant(isReady.value, 'ReCAPTCHA is not loaded')
  }

  async function wait() {
    await recaptchaLoaded.promise
    isReady.value = true
  }

  return {
    async render(ele: Element, options: RecaptchaV2Options) {
      await wait()
      return getRecaptcha().render(ele, options)
    },

    reset(widgetId?: WidgetID | undefined) {
      if (typeof widgetId === 'undefined') {
        return
      }
      assertLoaded()
      getRecaptcha().reset(widgetId)
    },

    async execute(widgetId?: WidgetID | undefined | string, options?: { action: string }) {
      if (typeof widgetId === 'undefined') {
        return
      }

      await wait()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
      return getRecaptcha().execute(widgetId, options as any) as any
    },
  }
}
