import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'

const base = {
  input: 'src/index.js',
  output: {
    name: 'VueRecaptcha',
    format: 'umd',
    file: 'dist/vue-recaptcha.js',
    globals: {
      vue: 'Vue',
    },
  },
  external: ['vue'],
  plugins: [
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { modules: false, loose: true }]],
      plugins: [['@babel/plugin-proposal-object-rest-spread', { loose: true }]],
      exclude: 'node_modules/**',
    }),
    resolve({
      resolveOnly: ['vue-demi'],
    }),
  ],
}

const minify = {
  ...base,
  output: {
    ...base.output,
    format: 'umd',
    file: 'dist/vue-recaptcha.min.js',
  },
  plugins: [...base.plugins, terser()],
}

const es = {
  ...base,
  output: {
    ...base.output,
    format: 'es',
    file: 'dist/vue-recaptcha.es.js',
  },
  external: ['vue', 'vue-demi'],
  plugins: [base.plugins[0]],
}

export default [base, minify, es]
