process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: ['@antfu', 'prettier', 'prettier/prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  env: {
    browser: true,
  },
}
