import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const server = new MongoMemoryServer()

export async function getTestConnection() {
  const serverURI = await server.getUri()
  try {
    await mongoose.connect(serverURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
