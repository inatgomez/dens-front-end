import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "jsx"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

export default config;
