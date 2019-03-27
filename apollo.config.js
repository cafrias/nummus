module.exports = {
  client: {
    includes: ["apps/web-client/src/**/*.{ts,tsx}"],
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
