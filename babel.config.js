const __TEST__ = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: __TEST__ ? 'commonjs' : false,
        loose: true
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        loose: true
      }
    ]
  ]
}
