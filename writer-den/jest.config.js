/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.test.json" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
