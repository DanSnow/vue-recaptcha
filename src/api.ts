// composables
export type { RecaptchaContextKey, RecaptchaOptionsInput, RecaptchaContext } from './composables/context'
export { useRecaptchaContext, useRecaptchaProxy } from './composables/context'
export type { UseChallengeV2Input, UseChallengeV2Return } from './composables/challenge-v2'
export { useChallengeV2, RecaptchaV2State } from './composables/challenge-v2'
export type { UseChallengeV3Return } from './composables/challenge-v3'
export { useChallengeV3 } from './composables/challenge-v3'
export { useRecaptchaProvider } from './composables/script-provider'

// components
export { default as ChallengeV2 } from './components/ChallengeV2.vue'
export { default as ChallengeV3 } from './components/ChallengeV3.vue'
export { default as Checkbox } from './components/Checkbox.vue'

// plugin
export { createPlugin } from './plugin'

// script loader
export type { RecaptchaParams, ScriptLoaderFactory, ScriptLoaderOptions } from './script-manager/common'
export { defineScriptLoader, toQueryString } from './script-manager/common'
