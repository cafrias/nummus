import * as React from "react"

import { cleanup, fireEvent, RenderResult } from "react-testing-library"

import "jest-dom/extend-expect"

import TransferFormsCreate, { TransferFormsCreateValues } from "./Create"
import { IdName } from "~/types/IdLabel"
import {
  recordFormTestCases,
  fillRecordFormsCreate,
} from "~/components/Record/Forms/Create.test"

// ---------------------------------------------------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------------------------------------------------
const accounts: IdName[] = [
  {
    id: "2",
    name: "Credit Card",
  },
]

// ---------------------------------------------------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------------------------------------------------
beforeEach(cleanup)

// ---------------------------------------------------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------------------------------------------------
describe("Transfer/Forms/Create", () => {
  recordFormTestCases(
    handleSubmit => (
      <TransferFormsCreate
        accountId="1"
        accounts={accounts}
        onSubmit={handleSubmit}
      />
    ),
    submitTransferFormsCreate,
    {
      destination: "2",
    },
    wrapper => {
      expect(wrapper.getByText("Select a destination account")).toBeVisible()
    }
  )
})

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
export function submitTransferFormsCreate(
  wrapper: RenderResult,
  values?: TransferFormsCreateValues
) {
  if (values) {
    fillRecordFormsCreate(wrapper, values)

    fireEvent.change(wrapper.getByLabelText("Destination account"), {
      target: { value: values.destination },
    })
  }

  fireEvent.click(wrapper.getByTestId("transfer_create"))
}
