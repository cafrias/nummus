import { createConnection } from "typeorm"
import { SpendCategory } from "~/entity/SpendCategory"
import { SpendGroup } from "@nummus/schema"

function exec() {
  createConnection()
    .then(connection => {
      const categories = [
        new SpendCategory({
          name: "Electricity",
          group: SpendGroup.Immediate_Obligations,
        }),
        new SpendCategory({
          name: "Internet",
          group: SpendGroup.Immediate_Obligations,
        }),
      ]

      connection.manager.save(categories)
    })
    .catch(err => console.error(err))
}

exec()
