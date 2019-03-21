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
import { AccountType, Account } from "~/models/Account"
import dataDebugAccount from "~/data/debug/account"
import { SpendCategory } from "~/models/SpendCategory"
import { SpendGroup } from "~/models/SpendGroup"

// ---------------------------------------------------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------------------------------------------------
const accounts: Account[] = [
  {
    id: "1",
    budget: "1",
    transactions: [],
    initialBalance: 0,
    name: "My bank account",
    type: AccountType.Bank,
  },
]

const categories: SpendCategory[] = [
  {
    id: "1",
    budget: "1",
    group: SpendGroup.ImmediateObligations,
    name: "Rent/Mortgage",
  },
]

// ---------------------------------------------------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------------------------------------------------
beforeEach(cleanup)

// ---------------------------------------------------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------------------------------------------------
describe("Account/Forms/Create", () => {
  let wrapper: RenderResult
  const handleSubmit = jest.fn()

  beforeEach(() => {
    handleSubmit.mockClear()
    wrapper = render(
      <TransactionFormsCreate
        accountId="1"
        accounts={accounts}
        categories={categories}
        onSubmit={handleSubmit}
      />
    )
  })

  it("submits when valid", async () => {
    const values: TransactionFormsCreateValues = {
      amount: 1000,
      incoming: false,
      account: "1",
      category: "1",
    }
    submitTransactionFormsCreate(wrapper, values)

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalled()
      expect(handleSubmit.mock.calls[0][0]).toEqual(values)
    })
  })

  it("validates data", async () => {
    const amounts = [0, -100]

    for (const amount of amounts) {
      fireEvent.change(wrapper.getByLabelText("Amount"), {
        target: { value: amount },
      })

      fireEvent.click(wrapper.getByTestId("transaction_create"))

      await wait(() => {
        expect(handleSubmit).not.toHaveBeenCalled()
        expect(wrapper.getByText("Should be greater than 0")).toBeVisible()
      })
    }

    expect(handleSubmit).not.toHaveBeenCalled()
    expect(wrapper.getByText("Select a category")).toBeVisible()
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
export function submitTransactionFormsCreate(
  wrapper: RenderResult,
  values: TransactionFormsCreateValues
) {
  fireEvent.change(wrapper.getByLabelText("Incoming"), {
    target: { value: values.incoming },
  })

  fireEvent.change(wrapper.getByLabelText("Amount"), {
    target: { value: values.amount },
  })

  fireEvent.change(
    wrapper.getByLabelText(values.incoming ? "From account" : "To account"),
    {
      target: { value: values.account },
    }
  )

  fireEvent.change(wrapper.getByLabelText("Category"), {
    target: { value: values.category },
  })

  fireEvent.click(wrapper.getByTestId("transaction_create"))
}
