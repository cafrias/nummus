import * as React from "react"

import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  wait,
} from "react-testing-library"

import "jest-dom/extend-expect"

import BudgetFormsCreate from "./Create"
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
    fireEvent.change(wrapper.getByLabelText("Name"), {
      target: { value: "My budget" },
    })
    fireEvent.change(wrapper.getByLabelText("Currency"), {
      target: { value: "ARS" },
    })
    fireEvent.click(wrapper.getByTestId("budget_create"))

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
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
