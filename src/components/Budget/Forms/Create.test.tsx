import * as React from "react"

import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  wait,
  act,
} from "react-testing-library"

import "jest-dom/extend-expect"

import BudgetFormsCreate, { BudgetFormsCreateValues } from "./Create"
import dataDebugCurrencies from "~/data/debug/currency"

beforeEach(cleanup)

describe("Budget: Create form", () => {
  let wrapper: RenderResult
  const handleSubmit = jest.fn()

  beforeEach(() => {
    handleSubmit.mockClear()
    wrapper = render(
      <BudgetFormsCreate
        currencies={Object.values(dataDebugCurrencies)}
        onSubmit={handleSubmit}
      />
    )
  })

  it("submits when valid", async () => {
    const input: BudgetFormsCreateValues = {
      name: "My budget",
      currency: "USD",
    }

    await submitForm(wrapper, input)

    await wait(() => {
      expect(handleSubmit.mock.calls[0][0]).toEqual(input)
    })
  })

  it("validates data", async () => {
    fireEvent.click(wrapper.getByTestId("budget_create"))

    await wait(() => {
      expect(handleSubmit).not.toHaveBeenCalled()
      expect(wrapper.getByText("Add a name to your budget")).toBeVisible()
    })
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------------------------------------------------
async function submitForm(
  wrapper: RenderResult,
  input: BudgetFormsCreateValues
) {
  act(() => {
    fireEvent.change(wrapper.getByLabelText("Name"), {
      target: { value: input.name },
    })
    fireEvent.change(wrapper.getByLabelText("Currency"), {
      target: { value: input.currency },
    })
  })

  fireEvent.click(wrapper.getByTestId("budget_create"))
}
