import config from './rollup.config';
import uglify from 'rollup-plugin-uglify';

config.dest = 'dist/vue-recaptcha.min.js';
config.plugins.push(uglify());

export default config;
