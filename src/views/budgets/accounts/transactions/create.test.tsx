import * as React from "react"
import { cleanup, RenderResult, fireEvent, wait } from "react-testing-library"

// Utils
import "jest-dom/extend-expect"
import renderWithRedux, {
  RenderWithReduxResult,
} from "~/utils/test/renderWithRedux"

// Router
import { navigate } from "@reach/router"
jest.mock("@reach/router")

const navigateMock = navigate as jest.Mock<typeof navigate>

// Redux
import StoreUIReducer, { StoreUIState } from "~/store/ui"
import { combineReducers } from "redux"
import { StoreTransactionThunks } from "~/store/transaction"

// Components
import TransactionCreate from "./create"
import UISnackbar from "~/components/UI/Snackbar"
import { TransactionFormsCreateValues } from "~/components/Transaction/Forms/Create"
import { Transaction } from "~/models/Transaction"
import dataDebugSpendCategory from "~/data/debug/spendCategory"
import { submitTransactionFormsCreate } from "~/components/Transaction/Forms/Create.test"
import StoreAccountReducer, { StoreAccountState } from "~/store/account";
import StoreSpendCategoryReducer, { StoreSpendCategoryState } from "~/store/spendCategory";
import dataDebugAccount from "~/data/debug/account";
import { CreateTransactionInput } from "~/services/TransactionService";

// ---------------------------------------------------------------------------------------------------------------------
// Redux setup
// ---------------------------------------------------------------------------------------------------------------------
interface PartialState {
  account: StoreAccountState,
  spendCategory: StoreSpendCategoryState,
  ui: StoreUIState
}
const reducer = combineReducers<PartialState>({
  account: StoreAccountReducer,
  spendCategory: StoreSpendCategoryReducer,
  ui: StoreUIReducer,
})

// ---------------------------------------------------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------------------------------------------------
afterEach(cleanup)

// ---------------------------------------------------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe("Transaction: create view", () => {
  let wrapper: RenderWithReduxResult<PartialState>

  beforeEach(() => {
    wrapper = renderWithRedux(
      <>
        <TransactionCreate budgetId="1" accountId="2" />
        <UISnackbar />
      </>,
      {
        initialState: {
          spendCategory: dataDebugSpendCategory,
          account: dataDebugAccount,
        },
        reducer,
      }
    )
  })

  it("creates new transaction", async () => {
    //
    // Fixture
    //
    const input: TransactionFormsCreateValues = {
      account: "1",
      amount: 800,
      incoming: false,
      category: "1",
    }
    const createInput: CreateTransactionInput = {
      amount: input.amount,
        category: "1",
        from: "2",
        to: "1",
    }
    const newTransactions: Transaction[] = [
      {
        id: "1",
        account: "2",
        amount: input.amount,
        incoming: false,
        category: dataDebugSpendCategory[input.category],
      },
      {
        id: "2",
        account: "1",
        amount: input.amount,
        incoming: true,
        category: dataDebugSpendCategory[input.category],
      },
    ]

    StoreTransactionThunks.create = jest.fn(() => async _ => newTransactions)

    submitTransactionFormsCreate(wrapper, input)

    await wait(() => {
      // Calls thunk
      expect(StoreTransactionThunks.create).toHaveBeenCalledWith(createInput)

      // Shows message to the user
      expect(wrapper.getByText(`Transaction saved`)).toBeVisible()

      // Redirects back to the budget
      expect(navigateMock).toHaveBeenCalledWith("/budgets/1")
    })
  })
})
