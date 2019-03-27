import * as React from "react"

import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  wait,
} from "react-testing-library"

import "jest-dom/extend-expect"

import RecordFormsCreate, { RecordFormsCreateValues } from "./Create"
import { IdName } from "~/types/IdLabel"

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
    name: "Credit card",
  },
]

// ---------------------------------------------------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------------------------------------------------
beforeEach(cleanup)

// ---------------------------------------------------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------------------------------------------------
describe("Record/Forms/Create", () => {
  recordFormTestCases(handleSubmit => (
    <RecordFormsCreate
      accounts={accounts}
      submitTestId="record_create"
      onSubmit={handleSubmit}
    />
  ))
})

// ---------------------------------------------------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------------------------------------------------
export function recordFormTestCases(
  renderFunction: (handleSubmit: jest.Mock) => React.ReactElement,
  submitForm = submitRecordFormsCreate,
  values: object = {},
  validation = (wrapper: RenderResult) => {}
) {
  describe("base functionality", () => {
    let wrapper: RenderResult
    const handleSubmit = jest.fn()

    beforeEach(() => {
      handleSubmit.mockClear()
      wrapper = render(renderFunction(handleSubmit))
    })

    it("submits when valid", async () => {
      const formValues = {
        amount: 1000,
        incoming: false,
        account: "1",
        ...values,
      }

      submitForm(wrapper, formValues)

      await wait(() => {
        expect(handleSubmit).toHaveBeenCalled()
        expect(handleSubmit.mock.calls[0][0]).toEqual(formValues)
      })
    })

    it("validates data", async () => {
      const amounts = [0, -100]

      for (const amount of amounts) {
        fireEvent.change(wrapper.getByLabelText("Amount"), {
          target: { value: amount },
        })

        submitForm(wrapper)

        await wait(() => {
          expect(handleSubmit).not.toHaveBeenCalled()
          expect(wrapper.getByText("Should be greater than 0")).toBeVisible()
        })
      }

      expect(handleSubmit).not.toHaveBeenCalled()

      expect(wrapper.getByText("Should select an origin account")).toBeVisible()

      validation(wrapper)
    })
  })
}

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
export function fillRecordFormsCreate(
  wrapper: RenderResult,
  values: RecordFormsCreateValues
) {
  fireEvent.change(wrapper.getByLabelText("Incoming"), {
    target: { value: values.incoming },
  })

  fireEvent.change(wrapper.getByLabelText("Amount"), {
    target: { value: values.amount },
  })

  fireEvent.change(wrapper.getByLabelText("Origin account"), {
    target: { value: values.account },
  })
}

function submitRecordFormsCreate(
  wrapper: RenderResult,
  values?: RecordFormsCreateValues
) {
  if (values) {
    fillRecordFormsCreate(wrapper, values)
  }
  fireEvent.click(wrapper.getByTestId("record_create"))
}
