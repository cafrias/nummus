module.exports = {
  client: {
    service: {
      name: "nummus",
      // endpoint: {
      //   url: "http://localhost:4000"
      // },
      // OR
      localSchemaFile: './src/schema.graphql',
      includes: ['src/**/*.{graphql,ts,js,tsx}'],
      excludes: ['**/node_modules/**'],
    }
  }
};