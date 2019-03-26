import "reflect-metadata"
import { createConnection, Connection } from "typeorm"

import fs from "fs"
import path from "path"

import { ApolloServer } from "apollo-server"
import resolverMap from "./resolvers"

const typeDefs = fs
  .readFileSync(
    path.join(`${__dirname}`, "..", "..", "..", "schema", "schema.graphql"),
    { encoding: "utf8" }
  )
  .toString()

export interface Context {
  connection: Connection
}

createConnection()
  .then(connection => {
    const context: Context = {
      connection,
    }
    const server = new ApolloServer({
      typeDefs,
      resolvers: resolverMap,
      context,
    })

    server.listen().then(({ url }) => {
      console.log(`Listening on ${url}`)
    })
  })
  .catch(error => console.log(error))
