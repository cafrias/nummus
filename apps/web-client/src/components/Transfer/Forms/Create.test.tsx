import * as React from "react"

import {
  cleanup,
  fireEvent,
  RenderResult,
  render,
  wait,
} from "react-testing-library"

import "jest-dom/extend-expect"

import TransferFormsCreate, { TransferFormsCreateValues } from "./Create"
import { IdName } from "~/types/IdLabel"
import {
  recordFormTestCases,
  fillRecordFormsCreate,
} from "~/components/Record/Forms/CreateTestHelpers"

// ---------------------------------------------------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------------------------------------------------
const accounts: IdName[] = [
  {
    id: "1",
    name: "Bank",
  },
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
      <TransferFormsCreate accounts={accounts} onSubmit={handleSubmit} />
    ),
    submitTransferFormsCreate,
    {
      destination: "2",
    },
    wrapper => {
      expect(wrapper.getByText("Select a destination account")).toBeVisible()
    }
  )

  describe("transfer validation", () => {
    it("doesn't allow transfers to same account", async () => {
      const handleSubmit = jest.fn()
      const wrapper = render(
        <TransferFormsCreate accounts={accounts} onSubmit={handleSubmit} />
      )

      fireEvent.change(wrapper.getByLabelText("Origin account"), {
        target: { value: "1" },
      })
      fireEvent.change(wrapper.getByLabelText("Destination account"), {
        target: { value: "1" },
      })
      fireEvent.click(wrapper.getByTestId("transfer_create"))

      await wait(() => {
        expect(handleSubmit).not.toHaveBeenCalled()
        expect(
          wrapper.getByText("Can't be the same as destination account")
        ).toBeVisible()
        expect(
          wrapper.getByText("Can't be the same as origin account")
        ).toBeVisible()
      })
    })
  })
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
