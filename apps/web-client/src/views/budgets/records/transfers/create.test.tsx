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
  BudgetsRecordsTransfersCreateInitQuery,
  BudgetsRecordsTransfersCreateMutation,
} from "./create"
import UISnackbar from "~/components/UI/Snackbar"
import { MockedProvider } from "react-apollo/test-utils"
import { CreateTransferInput } from "@nummus/schema"
import { IdName } from "~/types/IdLabel"
import { TransferFormsCreateValues } from "~/components/Transfer/Forms/Create"
import { submitTransferFormsCreate } from "~/components/Transfer/Forms/Create.test"

// ---------------------------------------------------------------------------------------------------------------------
// Mocked data
// ---------------------------------------------------------------------------------------------------------------------
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
describe("Transfer: create view", () => {
  it("creates new transfer", async () => {
    //
    // Fixture
    //
    const budgetId = "1"
    const originAccount = "1"
    const destinationId = "2"

    const formValues: TransferFormsCreateValues = {
      amount: 800,
      destination: destinationId,
      account: "1",
    }
    const createInput: CreateTransferInput = {
      amount: formValues.amount,
      destination: destinationId,
      accountId: originAccount,
    }

    const wrapper = renderWithRedux(
      <MockedProvider
        mocks={[
          //
          // Init query
          //
          {
            request: {
              query: BudgetsRecordsTransfersCreateInitQuery.gql,
              variables: {
                budgetId,
              },
            },
            result: {
              data: {
                accounts,
              },
            },
          },
          //
          // Create Mutation
          //
          {
            request: {
              query: BudgetsRecordsTransfersCreateMutation.gql,
              variables: {
                input: createInput,
              },
            },
            result: {
              data: {
                createTransfer: {
                  origin: {
                    id: "1",
                  },
                  destination: {
                    id: "2",
                  },
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <>
          <TransactionCreate budgetId={budgetId} accountId={originAccount} />
          <UISnackbar />
        </>
      </MockedProvider>,
      {
        reducer,
      }
    )

    await wait(() => {
      submitTransferFormsCreate(wrapper, formValues)
    })

    await wait(() => {
      // Shows message to the user
      expect(wrapper.getByText(`Transfer saved`)).toBeVisible()

      // Redirects back to the budget
      expect(navigateMock).toHaveBeenCalledWith(`/budgets/${budgetId}`)
    })
  })
})
