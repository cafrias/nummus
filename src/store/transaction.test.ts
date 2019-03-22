import {
  StoreTransactionThunks,
  StoreTransactionActionCreators,
} from "./transaction"

import { CreateTransactionInput } from "~/services/TransactionService"
import dataDebugSpendCategory from "~/data/debug/spendCategory"
import { Transaction } from "~/models/Transaction"

// Services
import services from "~/services/services"
jest.mock("~/services/services")

// ---------------------------------------------------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------------------------------------------------
beforeEach(() => {
  ;((services.transaction.create as unknown) as jest.Mock<
    typeof services.transaction.create
  >).mockClear()
})

// ---------------------------------------------------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------------------------------------------------
describe("Store/Transaction/Thunks", () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    dispatch.mockClear()
  })

  describe("create", () => {
    it("creates successfully", async () => {
      const input: CreateTransactionInput = {
        category: dataDebugSpendCategory["1"].id,
        from: "1",
        to: "2",
        amount: 800,
      }
      const output: Transaction[] = [
        {
          amount: 800,
          account: "1",
          pairTransaction: "2",
          category: dataDebugSpendCategory["1"],
          id: "1",
          incoming: true,
        },
        {
          amount: 800,
          account: "2",
          pairTransaction: "1",
          category: dataDebugSpendCategory["1"],
          id: "2",
          incoming: false,
        },
      ]

      services.transaction.create = jest.fn(async () => output)

      await StoreTransactionThunks.create(input)(dispatch, jest.fn(), undefined)

      // Calls service
      expect(services.transaction.create).toBeCalledWith(input)

      // Dispatches action with normalized data
      expect(dispatch).toBeCalledWith(
        StoreTransactionActionCreators.add({
          "1": {
            id: "1",
            account: "1",
            amount: 800,
            category: "1",
            pairTransaction: "2",
            incoming: true,
          },
          "2": {
            id: "2",
            account: "2",
            amount: 800,
            category: "1",
            pairTransaction: "1",
            incoming: false,
          },
        })
      )
    })
  })
})
