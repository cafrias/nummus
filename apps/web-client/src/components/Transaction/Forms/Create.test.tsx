import * as React from "react"

import { cleanup, fireEvent, RenderResult } from "react-testing-library"

import "jest-dom/extend-expect"

import TransactionFormsCreate, {
  TransactionFormsCreateValues,
  GroupedCategories,
} from "./Create"
import { SpendGroup } from "@nummus/schema"
import {
  recordFormTestCases,
  fillRecordFormsCreate,
} from "~/components/Record/Forms/Create.test"
import { IdName } from "~/types/IdLabel"

// ---------------------------------------------------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------------------------------------------------
const categories: GroupedCategories = {
  [SpendGroup.ImmediateObligations]: [
    {
      id: "1",
      name: "Rent/Mortgage",
    },
  ],
}

const accounts: IdName[] = [
  {
    id: "1",
    name: "Bank",
  },
]

// ---------------------------------------------------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------------------------------------------------
beforeEach(cleanup)

// ---------------------------------------------------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------------------------------------------------
describe("Transaction/Forms/Create", () => {
  recordFormTestCases(
    handleSubmit => (
      <TransactionFormsCreate
        accounts={accounts}
        categories={categories}
        onSubmit={handleSubmit}
      />
    ),
    submitTransactionFormsCreate,
    {
      category: "1",
    },
    wrapper => {
      expect(wrapper.getByText("Select a category")).toBeVisible()
    }
  )
})

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
export function submitTransactionFormsCreate(
  wrapper: RenderResult,
  values?: TransactionFormsCreateValues
) {
  if (values) {
    fillRecordFormsCreate(wrapper, values)

    fireEvent.change(wrapper.getByLabelText("Category"), {
      target: { value: values.category },
    })
  }

  fireEvent.click(wrapper.getByTestId("transaction_create"))
}
