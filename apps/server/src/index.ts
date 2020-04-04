import { ApolloServer } from "apollo-server"
import resolverMap from "./resolvers/index"

import schema from "./schema/schema"
import { getConnection } from "./db/db"
import AuthenticationService from "./services/AuthenticationService"
import { Context } from "./global"

getConnection()
  .then(connection => {
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolverMap,
      async context({ req }): Promise<Context> {
        const [
          user,
          token,
        ] = await AuthenticationService.getUserAndTokenFromAuthHeader(
          req.headers.authorization
        )
        return {
          db: connection,
          user,
          token,
        }
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
