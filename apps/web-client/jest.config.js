module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  displayName: "web-client",
}
