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
import StoreAccountReducer, { StoreAccountState } from "~/store/account"
import StoreSpendCategoryReducer, {
  StoreSpendCategoryState,
} from "~/store/spendCategory"
import dataDebugAccount from "~/data/debug/account"
import { CreateTransactionInput } from "~/services/TransactionService"
import { MockedProvider } from "react-apollo/test-utils"

// ---------------------------------------------------------------------------------------------------------------------
// Mocked data
// ---------------------------------------------------------------------------------------------------------------------
const spendCategories = [
  {
    id: "1",
    name: "Electric",
  },
]

const accounts = [
  {
    id: "1",
    name: "Savings",
  },
]

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
  it("creates new transaction", async () => {
    //
    // Fixture
    //
    const budgetId = "1"
    const originAccount = "2"
    const categoryId = "1"

    const formValues: TransactionFormsCreateValues = {
      account: originAccount,
      amount: 800,
      incoming: false,
      category: categoryId,
    }
    const createInput: CreateTransactionInput = {
      amount: formValues.amount,
      category: categoryId,
      from: originAccount,
    }

    const wrapper = renderWithRedux(
      <MockedProvider
        mocks={[
          //
          // Init query
          //
          {
            request: {
              query: BudgetsAccountsTransactionsInitQuery.gql,
            },
            result: {
              data: {
                spendCategories: [{}],
              },
            },
          },
          //
          // Create Mutation
          //
          {
            request: {
              query: BudgetsAccountsTransactionsCreateMutation.gql,
              variables: {
                input: createInput,
              },
            },
            result: {
              data: {
                createTransaction: [
                  {
                    id: "1",
                  },
                  {
                    id: "2",
                  },
                ],
              },
            },
          },
        ]}
        addTypename={false}
      >
        <TransactionCreate budgetId={budgetId} accountId={originAccount} />
        <UISnackbar />
      </MockedProvider>,
      {
        initialState: {
          spendCategory: dataDebugSpendCategory,
          account: dataDebugAccount,
        },
        reducer,
      }
    )

    StoreTransactionThunks.create = jest.fn(() => async _ => newTransactions)

    submitTransactionFormsCreate(wrapper, formValues)

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
