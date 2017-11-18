import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  exports: 'default',
  output: {
    format: 'umd',
    file: 'dist/vue-recaptcha.js'
  },
  name: 'VueRecaptcha',
  plugins: [
    babel({
      babelrc: false,
      presets: [['env', {modules: false}]],
      plugins: [
        'transform-object-rest-spread',
        'transform-object-assign',
        'transform-vue-jsx',
        'external-helpers'
      ],
      externalHelpersWhitelist: ['extends'],
      exclude: 'node_modules/**'
    })
  ]
}
