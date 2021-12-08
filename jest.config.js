/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  projects: [
    {
      displayName: 'vue3',
      testPathIgnorePatterns: ['/node_modules/', '<rootDir>/vue2-test'],
      testEnvironment: 'jsdom',
    },
    '<rootDir>/vue2-test',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        output: 'reports/jest/results.xml',
      },
    ],
  ],

  testEnvironment: 'jsdom',
}
