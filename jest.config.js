const { defaults } = require('jest-config')

module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
    '<rootDir>/node_modules/(?!(monaco-editor)/)',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.svg$': '<rootDir>/jest-svg-transformer.js',
  },
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '@app-strings': '<rootDir>/src/content/strings/a11y/',
    '@app-theme': '<rootDir>/src/theme/main/',
    'react-native$': 'react-native-web',
  },
  verbose: true,
  coverageDirectory: './coverage/',
  collectCoverage: true,
  testEnvironment: 'jsdom',
}
