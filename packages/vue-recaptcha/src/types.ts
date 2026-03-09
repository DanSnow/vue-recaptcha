import type { GRecaptcha, NormalizedScriptLoaderFactory } from "./script-manager/common";

export interface RecaptchaPlugin {
  _scriptLoaded?: boolean;
  scriptLoader?: NormalizedScriptLoaderFactory;
  getRecaptcha?: () => GRecaptcha;
}
