module.exports = {
  displayName: 'vue2',
  roots: ['<rootDir>/..'],
  testPathIgnorePatterns: ['/node_modules/', 'e2e/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    vue$: require.resolve('vue'),
    '@vue/test-utils$': require.resolve('@vue/test-utils'),
    '@vue/composition-api$': require.resolve('@vue/composition-api'),
    'vue-demi$': require.resolve('vue-demi'),
  },
}
