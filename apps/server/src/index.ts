import "reflect-metadata"
import { Connection } from "typeorm"

import { readSchema } from "@nummus/schema"

import { ApolloServer, gql } from "apollo-server"
import resolverMap from "./resolvers"
import { initDB } from "./db/init"

const typeDefs = gql(readSchema())

export interface Context {
  connection: Connection
}

initDB()
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
