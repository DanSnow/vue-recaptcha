import type { Plugin } from "vue-demi";
import type { RecaptchaOptionsInput } from "./composables/context";
import type { GRecaptcha } from "./script-manager/common";
import type { RecaptchaPlugin } from "./types";
import { ref } from "vue-demi";
import { normalizeOptions, RecaptchaContextKey } from "./composables/context";
import { createRecaptchaProxy } from "./composables/proxy";
import { checkRecaptchaLoad, recaptchaLoaded } from "./script-manager/common";
import { createHeadRecaptcha } from "./script-manager/head";
import { warn } from "./utils";

export interface CreatePluginOptions {
  getRecaptcha?: () => GRecaptcha;
}

export function createPlugin(plugins: RecaptchaPlugin[] = []): Plugin<[RecaptchaOptionsInput]> {
  const { getRecaptcha, scriptLoader }: Required<RecaptchaPlugin> = Object.assign(
    {
      scriptLoader: createHeadRecaptcha,
      getRecaptcha: () => window.grecaptcha,
    },
    ...plugins,
  );
  return {
    install(app, options) {
      const isReady = ref(false);

      async function waitLoaded() {
        await recaptchaLoaded.promise;
        isReady.value = true;
      }

      waitLoaded().catch((error) => warn("fail to load reCAPTCHA script", error));
      checkRecaptchaLoad();

      const opt = normalizeOptions(options);

      app.provide(RecaptchaContextKey, {
        isReady,
        scriptInjected: false,
        proxy: createRecaptchaProxy(isReady, getRecaptcha),
        useScriptProvider: scriptLoader(opt.loaderOptions),
        options: opt,
      });
    },
  };
}
