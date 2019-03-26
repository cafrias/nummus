import fs from "fs"
import path from "path"

import { ApolloServer } from "apollo-server"

const typeDefs = fs
  .readFileSync(
    path.join(`${__dirname}`, "..", "..", "..", "schema", "schema.graphql"),
    { encoding: "utf8" }
  )
  .toString()

const server = new ApolloServer({ typeDefs, mocks: true })

server.listen().then(({ url }) => {
  console.log(`Listening on ${url}`)
})
