/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  moduleDirectories: ["node_modules", "src"],

  moduleFileExtensions: ["ts", "js"],

  preset: 'ts-jest',

  testEnvironment: "jest-environment-node",

};

export default config;
