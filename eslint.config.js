const antfu = require('@antfu/eslint-config').default
const prettier = require('eslint-plugin-prettier')

const ignores = ['node_modules/**', 'dist/**', 'lib/**', 'coverage/**', '.yarn/**', '**/*.md', '**/*.toml']
module.exports = antfu(
  {
    ignores,
    stylistic: false,
    rules: {
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',

      'antfu/top-level-function': 'error',
    },
  },
  {
    plugins: { prettier },
    ignores,
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['docs/**/*.ts', 'docs/**/*.vue'],
    rules: {
      'no-console': 'off',
    },
  },
  { ignores },
)
