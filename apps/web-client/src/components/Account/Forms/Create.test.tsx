import * as React from "react"

import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  wait,
} from "react-testing-library"

import "jest-dom/extend-expect"

import AccountFormsCreate, { AccountFormsCreateValues } from "./Create"
import { AccountType } from "~/types/Account"

beforeEach(cleanup)

describe("Account/Forms/Create", () => {
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
      initialBalance: 500.5,
    }
    fillAndSubmitAccountFormsCreate(wrapper, values)

    await wait(() => {
      expect(handleSubmit.mock.calls[0][0]).toEqual(values)
    })
  })

  it("validates required data", async () => {
    submitAccountFormsCreate(wrapper)

    await wait(() => {
      expect(handleSubmit).not.toHaveBeenCalled()
      expect(wrapper.getByText("Add a name to your account")).toBeVisible()
    })
  })

  it("validates `name` length", async () => {
    fillAndSubmitAccountFormsCreate(wrapper, {
      initialBalance: 100,
      type: AccountType.Bank,
      name: "a".repeat(100),
    })

    await wait(() => {
      expect(
        wrapper.getByText("Should be less than 50 characters long")
      ).toBeVisible()
    })
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
export function fillAndSubmitAccountFormsCreate(
  wrapper: RenderResult,
  values: AccountFormsCreateValues
) {
  fillAccountFormsCreate(wrapper, values)
  submitAccountFormsCreate(wrapper)
}

function submitAccountFormsCreate(wrapper: RenderResult) {
  fireEvent.click(wrapper.getByTestId("account_create"))
}

function fillAccountFormsCreate(
  wrapper: RenderResult,
  values: AccountFormsCreateValues
) {
  fireEvent.change(wrapper.getByLabelText("Name"), {
    target: { value: values.name },
  })
  fireEvent.change(wrapper.getByLabelText("Type"), {
    target: { value: values.type },
  })
  fireEvent.change(wrapper.getByLabelText("Initial balance"), {
    target: { value: values.initialBalance },
  })
}
