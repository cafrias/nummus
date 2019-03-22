import StoreAccountReducer from "./account"
import { NormalizedTree } from "~/models/NormalizedTree"
import { AccountNormalized, AccountType } from "~/models/Account"
import { StoreTransactionActionCreators } from "./transaction"
import { TransactionNormalized } from "~/models/Transaction"

describe("Store/Account/Reducer", () => {
  it("updates transactions", () => {
    const initialState: NormalizedTree<AccountNormalized> = {
      "1": {
        id: "1",
        budget: "1",
        initialBalance: 0,
        name: "Name",
        transactions: [],
        type: AccountType.CreditCard,
      },
      "2": {
        id: "2",
        budget: "1",
        initialBalance: 0,
        name: "Name",
        transactions: [],
        type: AccountType.CreditCard,
      },
    }
    const transactions: NormalizedTree<TransactionNormalized> = {
      "1": {
        id: "1",
        account: "1",
        amount: 400,
        incoming: true,
        category: "1",
      },
      "2": {
        id: "2",
        account: "2",
        amount: 400,
        incoming: false,
        category: "1",
      },
    }
    const newState = StoreAccountReducer(
      initialState,
      StoreTransactionActionCreators.add(transactions)
    )

    expect(newState["1"].transactions).toEqual(["1"])
    expect(newState["2"].transactions).toEqual(["2"])
  })
})
