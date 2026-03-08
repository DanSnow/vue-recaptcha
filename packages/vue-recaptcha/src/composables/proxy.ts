import type { Ref } from "vue-demi";
import type { GRecaptcha, RecaptchaV2Options, WidgetID } from "../script-manager/common";
import { recaptchaLoaded } from "../script-manager/common";
import { invariant } from "../utils";

export interface RecaptchaProxy {
  render: (ele: Element, options: RecaptchaV2Options) => Promise<WidgetID>;
  reset: (widgetId?: WidgetID) => void;
  execute: ((siteKey: string, options: { action: string }) => Promise<string>) &
    ((widgetId?: WidgetID) => void);
}

export function createRecaptchaProxy(
  isReady: Ref<boolean>,
  getRecaptcha: () => GRecaptcha,
): RecaptchaProxy {
  function assertLoaded() {
    invariant(isReady.value, "ReCAPTCHA is not loaded");
  }

  async function wait() {
    await recaptchaLoaded.promise;
    isReady.value = true;
  }

  return {
    async render(ele: Element, options: RecaptchaV2Options) {
      await wait();
      return getRecaptcha().render(ele, options);
    },

    reset(widgetId?: WidgetID) {
      if (typeof widgetId === "undefined") return;

      assertLoaded();
      getRecaptcha().reset(widgetId);
    },

    async execute(widgetId?: WidgetID | string, options?: { action: string }) {
      if (typeof widgetId === "undefined") return;

      await wait();
      return getRecaptcha().execute(widgetId, options as any) as any;
    },
  };
}
