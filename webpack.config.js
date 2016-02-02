module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: "vue-recaptcha.js",
    library: "VueRecaptcha",
    libraryTarget: "umd"
  },
  externams: {
    vue: 'Vue'
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      },{
        test: /\.js$/,
        loader: 'babel!eslint',
        // make sure to exclude 3rd party code in node_modules
        exclude: /node_modules/
      }]
  },
  // vue-loader config:
  // lint all JavaScript inside *.vue files with ESLint
  // make sure to adjust your .eslintrc
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
};
