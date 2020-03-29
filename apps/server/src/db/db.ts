import mongoose from "mongoose"

export function getConnection() {
  return mongoose.connect("mongodb://localhost/nummus_dev", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}
