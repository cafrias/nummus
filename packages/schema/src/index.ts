import fs from "fs"
import path from "path"

export * from "./graphql"

export function readSchema() {
  return fs
    .readFileSync(path.join(__dirname, "schema.graphql"), {
      encoding: "utf8",
    })
    .toString()
}
