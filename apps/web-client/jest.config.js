const base = require("../../jest.config.base.js")

module.exports = {
  ...base,
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [`<rootDir>/src/**/*.test.tsx`],
  name: "web-client",
}
