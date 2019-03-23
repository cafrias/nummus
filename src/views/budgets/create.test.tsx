import * as React from "react"
import { cleanup, RenderResult, fireEvent, wait } from "react-testing-library"

// GraphQL
import { MockedProvider, MockedResponse } from "react-apollo/test-utils"

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
import StoreCurrencyReducer, { StoreCurrencyState } from "~/store/currency"
import { StoreBudgetThunks } from "~/store/budget"
import StoreUIReducer, { StoreUIState } from "~/store/ui"
import { combineReducers } from "redux"

// Components
import BudgetCreate, {
  BudgetCreateInitQuery,
  BudgetCreateMutation,
} from "./create"
import UISnackbar from "~/components/UI/Snackbar"

import dataDebugCurrencies from "~/data/debug/currency"
import dataDebugUser from "~/data/debug/user"
import { BudgetFormsCreateValues } from "~/components/Budget/Forms/Create"
import { Budget } from "~/models/Budget"
import { Currency } from "~/models/Currency"

// ---------------------------------------------------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------------------------------------------------
// TODO: create new currency model
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
// Apollo mocks
// ---------------------------------------------------------------------------------------------------------------------
const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: BudgetCreateInitQuery.gql,
    },
    result: {
      data: { currencies },
    },
  },
  {
    request: {
      query: BudgetCreateMutation.gql,
      variables: {
        input: {
          name: "My budget",
          currencyCode: "USD",
          userId: "1",
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
  let wrapper: RenderWithReduxResult<PartialState>

  beforeEach(() => {
    wrapper = renderWithRedux(
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <BudgetCreate />
        <UISnackbar />
      </MockedProvider>,
      {
        reducer,
      }
    )
  })

  it("creates new budget", async () => {
    const input = {
      name: "My budget",
      currency: "USD",
    }
    const newBudget: Budget = {
      id: "1",
      currency: currencies[1],
      name: input.name,
      user: dataDebugUser["1"],
      accounts: [],
    }

    StoreBudgetThunks.create = jest.fn(() => async _ => newBudget)

    await wait(() => {
      submitForm(wrapper, input)
    })

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
