import antfu from '@antfu/eslint-config'
import eslintPluginPrettier from 'eslint-plugin-prettier'

const ignores = ['node_modules/**', 'dist/**', 'lib/**', 'coverage/**', '.yarn/**', '**/*.md', '**/*.toml']

export default antfu(
  {
    ignores,
    stylistic: false,
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',

      'antfu/top-level-function': 'error',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['packages/docs/**/*.ts', 'packages/docs/**/*.vue'],
    rules: {
      'no-console': 'off',
    },
  },
  { ignores },
)
