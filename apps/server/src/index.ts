import { ApolloServer } from "apollo-server"
import resolverMap from "./resolvers"

import schema from "./schema/schema"

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolverMap,
})

server.listen().then(({ url }) => {
  console.log(`Listening on ${url}`)
})
