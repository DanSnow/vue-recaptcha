import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  exports: 'default',
  format: 'umd',
  moduleName: 'VueRecaptcha',
  plugins: [
    babel({
      presets: [
        ['es2015', { modules: false }],
        'stage-0'
      ],
      plugins: [
        'transform-vue-jsx'
      ],
      exclude: 'node_modules/**'
    })
  ],
  dest: 'dist/vue-recaptcha.js'
};
