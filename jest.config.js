const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testPathIgnorePatterns: ['<rootDir>/tests/__e2e__'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '@app-strings': '<rootDir>/src/content/strings/a11y/',
    '@app-theme': '<rootDir>/src/theme/main/',
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
