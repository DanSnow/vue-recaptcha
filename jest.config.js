/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  setupFilesAfterEnv: ['jest-extended'],
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
