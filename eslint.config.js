const antfu = require('@antfu/eslint-config').default
const prettier = require('eslint-plugin-prettier')

const ignores = ['node_modules/**', 'dist/**', 'lib/**', 'coverage/**', '.yarn/**']
module.exports = antfu(
  {
    ignores,
  },
  {
    plugins: { prettier },
    ignores,
    rules: {
      'prettier/prettier': 'error',
    },
  },
  { ignores },
)
