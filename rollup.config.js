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
      presets: [
        ['es2015', { modules: false }],
        'stage-2'
      ],
      plugins: [
        'transform-vue-jsx'
      ],
      exclude: 'node_modules/**'
    })
  ],
  dest: 'dist/vue-recaptcha.js'
};
