module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|jpeg|svg)$':
      'jest-transform-stub',
  },
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
  setupFiles: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'jsdom',
};
