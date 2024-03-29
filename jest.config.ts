import type { Config } from "@jest/types"

const baseDir = `${__dirname}/./src/**`;
const baseTestDir = `${__dirname}/./test/**`;

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `${baseDir}/*.ts`
  ],
  testMatch: [
    `${baseTestDir}/*test.ts`
  ]
};

export default config;