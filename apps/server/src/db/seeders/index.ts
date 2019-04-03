import { SpendCategory } from "~/models/SpendCategory"
import { SpendGroup, AccountType } from "@nummus/schema"
import { Budget } from "~/models/Budget"
import { Currency } from "~/models/Currency"
import { User } from "~/models/User"
import { initDB } from "../init"
import { Account } from "~/models/Account"

function exec() {
  initDB()
    .then(connection => {
      const toSave = []

      //
      // User
      //
      const user = new User()
      toSave.push(user)

      //
      // Currency
      //
      const USDollar = new Currency({
        id: "USD",
        name: "US Dollar",
      })
      toSave.push(USDollar)

      //
      // Budget
      //
      const budget = new Budget({
        currency: USDollar,
        name: "My budget",
        user,
      })
      toSave.push(budget)

      //
      // Categories
      //
      const categories = [
        new SpendCategory({
          name: "Electricity",
          group: SpendGroup.ImmediateObligations,
          budget,
        }),
        new SpendCategory({
          name: "Internet",
          group: SpendGroup.ImmediateObligations,
          budget,
        }),
      ]
      toSave.push(...categories)

      //
      // Account
      //
      const accounts = {
        bank: new Account({
          budget,
          initialBalance: 0,
          name: "My bank account",
          type: AccountType.Bank,
        }),
        creditCard: new Account({
          budget,
          initialBalance: -500,
          name: "My credit card",
          type: AccountType.CreditCard,
        }),
      }
      toSave.push(...Object.values(accounts))

      connection.manager.save(toSave)
    })
    .catch(err => console.error(err))
}

exec()
