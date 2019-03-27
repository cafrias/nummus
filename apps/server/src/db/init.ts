import { ConnectionOptionsReader, createConnection } from "typeorm"

export async function initDB() {
  const connOpts = await new ConnectionOptionsReader({
    root: process.cwd(),
  }).get("default")

  return createConnection(connOpts)
}
