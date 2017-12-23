import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const base = {
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
        'external-helpers'
      ],
      externalHelpersWhitelist: ['extends'],
      exclude: 'node_modules/**'
    })
  ]
}

const minify = Object.assign({}, base, {
  output: {
    format: 'umd',
    file: 'dist/vue-recaptcha.min.js'
  },
  plugins: [...base.plugins, uglify()]
})

const es = Object.assign({}, base, {
  output: {
    format: 'es',
    file: 'dist/vue-recaptcha.es.js'
  }
})

export default [base, minify, es]
