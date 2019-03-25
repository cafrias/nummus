import * as React from "react"
import { cleanup, wait } from "react-testing-library"

// Utils
import "jest-dom/extend-expect"
import renderWithRedux from "~/utils/test/renderWithRedux"

// Router
import { navigate } from "@reach/router"
jest.mock("@reach/router")

const navigateMock = navigate as jest.Mock<typeof navigate>

// Redux
import StoreUIReducer, { StoreUIState } from "~/store/ui"
import { combineReducers } from "redux"

// Components
import TransactionCreate, {
  BudgetsAccountsTransactionsCreateInitQuery,
  BudgetsAccountsTransactionsCreateMutation,
} from "./create"
import UISnackbar from "~/components/UI/Snackbar"
import { TransactionFormsCreateValues } from "~/components/Transaction/Forms/Create"
import { CreateTransactionInput } from "~/models/Transaction"
import { submitTransactionFormsCreate } from "~/components/Transaction/Forms/Create.test"
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
      amount: 800,
      incoming: false,
      category: categoryId,
    }
    const createInput: CreateTransactionInput = {
      amount: formValues.amount,
      categoryId,
      accountId: originAccount,
      incoming: formValues.incoming,
    }

    const wrapper = renderWithRedux(
      <MockedProvider
        mocks={[
          //
          // Init query
          //
          {
            request: {
              query: BudgetsAccountsTransactionsCreateInitQuery.gql,
            },
            result: {
              data: {
                spendCategories,
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
                createTransaction: {
                  id: "1",
                },
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
        reducer,
      }
    )

    await wait(() => {
      submitTransactionFormsCreate(wrapper, formValues)
    })

    await wait(() => {
      // Shows message to the user
      expect(wrapper.getByText(`Transaction saved`)).toBeVisible()

      // Redirects back to the budget
      expect(navigateMock).toHaveBeenCalledWith(`/budgets/${budgetId}`)
    })
  })
})
