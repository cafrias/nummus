import * as React from "react"
import {
  render,
  cleanup,
  RenderResult,
  fireEvent,
  wait,
  act,
} from "react-testing-library"

import "jest-dom/extend-expect"
import renderWithRedux, {
  RenderWithReduxResult,
} from "~/utils/test/renderWithRedux"

// Redux
import StoreCurrencyReducer, { StoreCurrencyState } from "~/store/currency"
import StoreBudgetReducer, { StoreBudgetState } from "~/store/budget"
import { combineReducers, Store } from "redux"

// Components
import BudgetCreate from "./Create"

// Services
import services from "~/services/services"
import BudgetService, { CreateBudgetInput } from "~/services/BudgetService"
import dataDebugCurrencies from "~/data/debug/currency"
import dataDebugUser from "~/data/debug/user"
import { ValidationError } from "~/errors/DataErrors"
import { BudgetFormsCreateValues } from "~/components/Budget/Forms/Create"
jest.mock("~/services/BudgetService")

// ---------------------------------------------------------------------------------------------------------------------
// Redux setup
// ---------------------------------------------------------------------------------------------------------------------
interface PartialState {
  currency: StoreCurrencyState
  budget: StoreBudgetState
}
const reducer = combineReducers<PartialState>({
  currency: StoreCurrencyReducer,
  budget: StoreBudgetReducer,
})

// ---------------------------------------------------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------------------------------------------------
afterEach(cleanup)

beforeEach(() => {
  ;(services.budget.create as jest.Mock).mockClear()
})

// ---------------------------------------------------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe("Budget create view", () => {
  let wrapper: RenderWithReduxResult<PartialState>

  beforeEach(() => {
    wrapper = renderWithRedux(<BudgetCreate />, {
      initialState: {
        currency: dataDebugCurrencies,
      },
      reducer,
    })
  })

  it("renders successfully", () => {
    expect(wrapper.getByText("Create")).toBeVisible()
  })

  it("creates new budget", async () => {
    const input = {
      name: "My budget",
      currency: "USD",
    }
    services.budget.create = jest.fn(async (_: CreateBudgetInput) => ({
      id: "1",
      currency: dataDebugCurrencies[input.currency],
      name: input.name,
      user: dataDebugUser[input.currency],
    }))

    submitForm(wrapper, input)

    await wait(() => {
      expect(services.budget.create).toHaveBeenCalledTimes(1)
      expect(
        wrapper.getByText(`Budget '${input.name}' created successfully`)
      ).toBeVisible()
    })
  })

  it("interprets validation errors from server", async () => {
    const errorMessage = "You should fill it"
    services.budget.create = jest.fn(async () => {
      throw new ValidationError<BudgetFormsCreateValues>("Invalid entity", {
        name: errorMessage,
      })
    })

    submitForm(wrapper, {
      name: "name",
      currency: "ARS",
    })

    await wait(() => {
      expect(wrapper.getByText(errorMessage)).toBeVisible()
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
