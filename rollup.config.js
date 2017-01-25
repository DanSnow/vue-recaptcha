import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  exports: 'default',
  format: 'umd',
  moduleName: 'VueRecaptcha',
  plugins: [
    commonjs(),
    nodeResolve({
      main: true
    }),
    babel({
      babelrc: false,
      presets: [
        ['es2015', { modules: false }],
        'stage-2'
      ],
      plugins: [
        'transform-object-assign',
        'transform-vue-jsx',
        'external-helpers'
      ],
      externalHelpersWhitelist: ['extends'],
      exclude: 'node_modules/**'
    })
  ],
  dest: 'dist/vue-recaptcha.js'
};
