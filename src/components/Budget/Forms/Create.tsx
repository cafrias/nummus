import * as React from "react"

import {
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  Formik,
  FormikErrors,
  FormikActions,
} from "formik"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import { Currency } from "~/models/Currency"

export interface BudgetFormsCreateValues {
  name: string
  currency: string
}

export interface BudgetFormsCreateProps {
  currencies: Currency[]
  onSubmit: (
    values: BudgetFormsCreateValues,
    formActions: FormikActions<BudgetFormsCreateValues>
  ) => any
}

const BudgetFormsCreate: React.SFC<BudgetFormsCreateProps> = ({
  currencies,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={{
        name: "",
        currency: currencies[0].code,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const errors: FormikErrors<typeof values> = {}
        if (!values.name) errors.name = "Add a name to your budget"
        return errors
      }}
    >
      {form => {
        return (
          <Form>
            <Field name="name" placeholder="Name">
              {({ field, form }: FieldProps) => (
                <TextField
                  {...field}
                  error={form.touched["name"] && !!form.errors["name"]}
                  variant="outlined"
                  label="Name"
                  helperText={<ErrorMessage name="name" />}
                />
              )}
            </Field>
            <Field name="currency" placeholder="Currency">
              {({ field, form }: FieldProps) => (
                <TextField
                  {...field}
                  select
                  variant="outlined"
                  label="Currency"
                >
                  {currencies.map(currency => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.code}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Field>
            <Button color="primary" variant="contained" type="submit">
              Create
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default BudgetFormsCreate
