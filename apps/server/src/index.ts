import "reflect-metadata"
import { createConnection, Connection } from "typeorm"

import { readSchema } from "schema"

import { ApolloServer, gql } from "apollo-server"
import resolverMap from "./resolvers"

const typeDefs = gql(readSchema())

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
