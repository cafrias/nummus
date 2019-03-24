import * as React from "react"
import { cleanup, RenderResult, fireEvent, wait } from "react-testing-library"

// GraphQL
import { MockedProvider } from "react-apollo/test-utils"

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
import BudgetCreate, {
  BudgetCreateInitQuery,
  BudgetCreateMutation,
} from "./create"
import UISnackbar from "~/components/UI/Snackbar"

import { BudgetFormsCreateValues } from "~/components/Budget/Forms/Create"
import { Currency } from "~/models/Currency"

// ---------------------------------------------------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------------------------------------------------
const currencies: Currency[] = [
  {
    id: "ARS",
    name: "Argentine Peso",
  },
  {
    id: "USD",
    name: "US Dollar",
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
describe("Budget create view", () => {
  it("creates new budget", async () => {
    const input = {
      name: "My budget",
      currency: "USD",
    }
    const userId = "1"

    const wrapper = renderWithRedux(
      <MockedProvider
        mocks={[
          //
          // Init query
          //
          {
            request: {
              query: BudgetCreateInitQuery.gql,
            },
            result: {
              data: { currencies },
            },
          },
          //
          // Create mutation
          //
          {
            request: {
              query: BudgetCreateMutation.gql,
              variables: {
                input: {
                  userId,
                  currencyCode: input.currency,
                  name: input.name,
                },
              },
            },
            result: {
              data: {
                createBudget: {
                  id: "1",
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <BudgetCreate />
        <UISnackbar />
      </MockedProvider>,
      {
        reducer,
      }
    )

    //
    // Action
    //
    await wait(() => {
      submitForm(wrapper, input)
    })

    //
    // Assert
    //
    await wait(
      () => {
        // Shows message to the user
        expect(
          wrapper.getByText(`Budget '${input.name}' created successfully`)
        ).toBeVisible()

        // Redirects to create account
        expect(navigateMock).toHaveBeenCalledWith("/budgets/1/accounts/create")
      },
      { timeout: 1000 }
    )
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
function submitForm(wrapper: RenderResult, input: BudgetFormsCreateValues) {
  fireEvent.change(wrapper.getByLabelText("Name"), {
    target: { value: input.name },
  })
  fireEvent.change(wrapper.getByLabelText("Currency"), {
    target: { value: input.currency },
  })

  fireEvent.click(wrapper.getByTestId("budget_create"))
}
