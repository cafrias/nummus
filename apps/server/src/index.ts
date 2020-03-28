import "reflect-metadata"
import { Connection } from "typeorm"

import { ApolloServer } from "apollo-server"
import resolverMap from "./resolvers"
import { initDB } from "./db/init"

import schema from "./schema/schema"

export interface Context {
  orm: Connection
}

initDB()
  .then(connection => {
    const context: Context = {
      orm: connection,
    }
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolverMap,
      context,
    })

    server.listen().then(({ url }) => {
      console.log(`Listening on ${url}`)
    })
  })
  .catch(error => console.log(error))
