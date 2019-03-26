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

import { CreateFormProps } from "./Create"
import { Formik, Form, Field, ErrorMessage } from "formik"
import UIFormsCreate from "./Create"
import { ValidationError } from "~/errors/DataErrors"

beforeEach(cleanup)

interface DummyFormValues {
  textInput: string
}
const DummyForm: React.SFC<CreateFormProps<DummyFormValues>> = ({
  onSubmit,
}) => (
  <Formik
    initialValues={{
      textInput: "",
    }}
    onSubmit={onSubmit}
  >
    {form => (
      <Form>
        <label htmlFor="textInput">Text Input</label>
        <Field id="textInput" name="textInput" />
        <ErrorMessage name="textInput" />
        <button type="submit" id="submit" data-testid="submit">
          Submit
        </button>
      </Form>
    )}
  </Formik>
)

describe("UI/Forms/Create", () => {
  it("calls `create` when valid", async () => {
    const create = jest.fn()
    const wrapper = render(
      UIFormsCreate<{}, DummyFormValues>({
        create,
        component: DummyForm,
      })
    )

    const input: DummyFormValues = {
      textInput: "input value",
    }

    submitForm(wrapper, input)

    await wait(() => {
      expect(create).toHaveBeenCalledWith(input)
    })
  })

  it("handles validation error", async () => {
    const errorMessage = "You should fill it"
    const create = jest.fn(() => {
      throw new ValidationError<DummyFormValues>("Invalid entity", {
        textInput: errorMessage,
      })
    })
    const wrapper = render(
      UIFormsCreate<{}, DummyFormValues>({
        create,
        component: DummyForm,
        FormProps: {},
      })
    )

    submitForm(wrapper, {
      textInput: "asd",
    })

    await wait(() => {
      expect(wrapper.getByText(errorMessage)).toBeVisible()
    })
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------------------------------------------------
function submitForm(wrapper: RenderResult, input: DummyFormValues) {
  fireEvent.change(wrapper.getByLabelText("Text Input"), {
    target: { value: input.textInput },
  })

  fireEvent.click(wrapper.getByTestId("submit"))
}
