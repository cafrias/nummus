import { ApolloServer } from "apollo-server"
import resolverMap from "./resolvers"

import schema from "./schema/schema"
import { getConnection } from "./db/db"

getConnection()
  .then(connection => {
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolverMap,
      context: {
        db: connection,
      },
    })

    server.listen().then(({ url }) => {
      console.log(`Listening on ${url}`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
