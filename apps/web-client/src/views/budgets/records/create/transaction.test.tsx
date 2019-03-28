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
  BudgetsRecordsCreateTransactionInitQuery,
  BudgetsRecordsCreateTransactionMutation,
} from "./transaction"
import UISnackbar from "~/components/UI/Snackbar"
import { TransactionFormsCreateValues } from "~/components/Transaction/Forms/Create"
import { CreateTransactionInput } from "~/types/Transaction"
import { submitTransactionFormsCreate } from "~/components/Transaction/Forms/Create.test"
import { MockedProvider } from "react-apollo/test-utils"
import { SpendCategory, SpendGroup } from "@nummus/schema"
import { IdName } from "~/types/IdLabel"

// ---------------------------------------------------------------------------------------------------------------------
// Mocked data
// ---------------------------------------------------------------------------------------------------------------------
const spendCategories: SpendCategory[] = [
  {
    id: "1",
    name: "Electric",
    group: SpendGroup.ImmediateObligations,
  },
]

const accounts: IdName[] = [
  {
    id: "1",
    name: "Bank",
  },
  {
    id: "2",
    name: "Credit card",
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
    const accountId = "2"
    const categoryId = "1"

    const formValues: TransactionFormsCreateValues = {
      amount: 800,
      incoming: false,
      category: categoryId,
      account: accountId,
    }
    const createInput: CreateTransactionInput = {
      amount: formValues.amount,
      categoryId,
      accountId: accountId,
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
              query: BudgetsRecordsCreateTransactionInitQuery.gql,
              variables: {
                budgetId,
              },
            },
            result: {
              data: {
                spendCategories,
                accounts,
              },
            },
          },
          //
          // Create Mutation
          //
          {
            request: {
              query: BudgetsRecordsCreateTransactionMutation.gql,
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
        <>
          <TransactionCreate budgetId={budgetId} />
          <UISnackbar />
        </>
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
