module.exports = {
  client: {
    includes: ["packages/web-client/src/**/*.{ts,tsx}"],
    service: {
      name: "nummus",
      localSchemaFile: "packages/schema/src/schema.graphql",
    },
  },
  service: {
    name: "nummus",
    localSchemaFile: "packages/schema/src/schema.graphql",
  },
}
