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
import StoreCurrencyReducer, { StoreCurrencyState } from "~/store/currency"
import { StoreBudgetThunks } from "~/store/budget"
import StoreUIReducer, { StoreUIState } from "~/store/ui"
import { combineReducers } from "redux"

// Components
import BudgetCreate from "./create"
import UISnackbar from "~/components/UI/Snackbar"

import dataDebugCurrencies from "~/data/debug/currency"
import dataDebugUser from "~/data/debug/user"
import { BudgetFormsCreateValues } from "~/components/Budget/Forms/Create"
import { Budget } from "~/models/Budget"

// ---------------------------------------------------------------------------------------------------------------------
// Redux setup
// ---------------------------------------------------------------------------------------------------------------------
interface PartialState {
  currency: StoreCurrencyState
  ui: StoreUIState
}
const reducer = combineReducers<PartialState>({
  currency: StoreCurrencyReducer,
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
      <>
        <BudgetCreate />
        <UISnackbar />
      </>,
      {
        initialState: {
          currency: dataDebugCurrencies,
        },
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
      currency: dataDebugCurrencies[input.currency],
      name: input.name,
      user: dataDebugUser["1"],
      accounts: [],
    }

    StoreBudgetThunks.create = jest.fn(() => async _ => newBudget)

    submitForm(wrapper, input)

    await wait(() => {
      // Calls thunk
      expect(StoreBudgetThunks.create).toHaveBeenCalledWith({
        name: input.name,
        currencyCode: input.currency,
        userId: "1",
      })

      // Shows message to the user
      expect(
        wrapper.getByText(`Budget '${input.name}' created successfully`)
      ).toBeVisible()

      // Redirects to create account
      expect(navigateMock).toHaveBeenCalledWith("/budgets/1/accounts/create")
    })
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
