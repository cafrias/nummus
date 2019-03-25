module.exports = {
  client: {
    includes: ["packages/web-client/src/**/*.{ts,tsx}"],
    service: {
      name: "nummus",
      localSchemaFile: "schema/schema.graphql"
    }
  }
};
