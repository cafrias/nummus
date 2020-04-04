import mongoose, { Mongoose, ClientSession } from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const server = new MongoMemoryServer()

export async function getTestConnection() {
  const serverURI = await server.getUri()
  try {
    return await mongoose.connect(serverURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export async function wrapInTransaction(
  db: Mongoose | null,
  cb: (session: ClientSession) => Promise<void>
) {
  if (!db) {
    throw new Error("Connection to db is invalid")
  }

  return (await db.startSession()).withTransaction(async (session) => {
    await cb(session)
    await session.abortTransaction()
  })
}
