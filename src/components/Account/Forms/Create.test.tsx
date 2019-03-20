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

import AccountFormsCreate, { AccountFormsCreateValues } from "./Create"
import { AccountType } from "~/models/Account"

beforeEach(cleanup)

describe("Account: Create form", () => {
  let wrapper: RenderResult
  const handleSubmit = jest.fn()

  beforeEach(() => {
    handleSubmit.mockClear()
    wrapper = render(<AccountFormsCreate onSubmit={handleSubmit} />)
  })

  it("submits when valid", async () => {
    const values: AccountFormsCreateValues = {
      name: "My new account",
      type: AccountType.CreditCard,
    }
    submitForm(wrapper, values)

    await wait(() => {
      expect(handleSubmit.mock.calls[0][0]).toEqual(values)
    })
  })

  it("validates data", async () => {
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
function submitForm(wrapper: RenderResult, values: AccountFormsCreateValues) {
  fireEvent.change(wrapper.getByLabelText("Name"), {
    target: { value: values.name },
  })
  fireEvent.change(wrapper.getByLabelText("Type"), {
    target: { value: values.type },
  })

  fireEvent.click(wrapper.getByTestId("account_create"))
}
