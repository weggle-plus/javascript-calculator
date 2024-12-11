/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from 'ts-jest'


const jestConfig : JestConfigWithTsJest = {
  bail: true,
  verbose: true,
  collectCoverage: true,
  testTimeout: 10000,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['\\.d\\.ts$'],
  modulePathIgnorePatterns: [
    'node_modules/',
    'dist/'
  ],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  }
}

export default jestConfig
