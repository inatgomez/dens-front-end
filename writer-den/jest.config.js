/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
