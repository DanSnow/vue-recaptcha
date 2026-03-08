// components
export { default as ChallengeV2 } from "./components/ChallengeV2.vue";
export { default as ChallengeV3 } from "./components/ChallengeV3.vue";
export { default as Checkbox } from "./components/Checkbox.vue";
export type { UseChallengeV2Input, UseChallengeV2Return } from "./composables/challenge-v2";
export { RecaptchaV2State, useChallengeV2 } from "./composables/challenge-v2";
export type { UseChallengeV3Return } from "./composables/challenge-v3";
export { useChallengeV3 } from "./composables/challenge-v3";

// composables
export type {
  RecaptchaContext,
  RecaptchaContextKey,
  RecaptchaOptionsInput,
} from "./composables/context";
export { useRecaptchaContext, useRecaptchaProxy } from "./composables/context";
export { useRecaptchaProvider } from "./composables/script-provider";

// plugin
export { createPlugin } from "./plugin";

// script loader
export type {
  RecaptchaParams,
  ScriptLoaderFactory,
  ScriptLoaderOptions,
} from "./script-manager/common";
export { defineScriptLoader, toQueryString } from "./script-manager/common";
