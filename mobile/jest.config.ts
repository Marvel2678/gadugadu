/**  @jest-config-loader ts-node */
/** @jest-config-loader esbuild-register */
import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // transform: {
  //   "^.+\\.(ts|tsx)$": "esbuild-register",
  // },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/build/",
    "/__tests__/utils/", // IGNORE
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "services/**/*.{ts,tsx}",
    // setupFilesAfterEnv: ["@testing-library/react-native"],
  ],
};

export default config;
