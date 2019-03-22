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

// ---------------------------------------------------------------------------------------------------------------------
// Redux setup
// ---------------------------------------------------------------------------------------------------------------------
interface PartialState {
  ui: StoreUIState
}
const reducer = combineReducers<PartialState>({
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
        <TransactionCreate accountId="1" />
        <UISnackbar />
      </>,
      {
        reducer,
      }
    )
  })

  it("creates new transaction", async () => {
    //
    // Fixture
    //
    const input: TransactionFormsCreateValues = {
      account: "2",
      amount: 800,
      incoming: false,
      category: "1",
    }
    const newTransactions: Transaction[] = [
      {
        id: "1",
        account: "1",
        amount: input.amount,
        incoming: false,
        category: dataDebugSpendCategory[input.category],
      },
      {
        id: "2",
        account: "2",
        amount: input.amount,
        incoming: true,
        category: dataDebugSpendCategory[input.category],
      },
    ]

    StoreTransactionThunks.create = jest.fn(() => async _ => newTransactions)

    submitTransactionFormsCreate(wrapper, input)

    await wait(() => {
      // Calls thunk
      expect(StoreTransactionThunks.create).toHaveBeenCalledWith({
        budgetId: "1",
        ...input,
      })

      // Shows message to the user
      expect(wrapper.getByText(`Transaction saved`)).toBeVisible()

      // Redirects to create transaction
      expect(navigateMock).toHaveBeenCalledWith("/budgets/1")
    })
  })
})
