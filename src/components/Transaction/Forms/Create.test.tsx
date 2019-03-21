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

import TransactionFormsCreate, { TransactionFormsCreateValues } from "./Create"
import { AccountType } from "~/models/Account"

beforeEach(cleanup)

describe("Account/Forms/Create", () => {
  let wrapper: RenderResult
  const handleSubmit = jest.fn()

  beforeEach(() => {
    handleSubmit.mockClear()
    wrapper = render(<TransactionFormsCreate onSubmit={handleSubmit} />)
  })

  xit("submits when valid", async () => {
    const values: TransactionFormsCreateValues = {
      amount: 1000,
    }
    submitForm(wrapper, values)

    await wait(() => {
      expect(handleSubmit.mock.calls[0][0]).toEqual(values)
    })
  })

  xit("validates data", async () => {
    fireEvent.click(wrapper.getByTestId("account_create"))

    await wait(() => {
      expect(handleSubmit).not.toHaveBeenCalled()
      expect(wrapper.getByText("Add a name to your account")).toBeVisible()
    })
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
function submitForm(
  wrapper: RenderResult,
  values: TransactionFormsCreateValues
) {
  fireEvent.change(wrapper.getByLabelText("Name"), {
    target: { value: values.amount },
  })

  fireEvent.click(wrapper.getByTestId("account_create"))
}
