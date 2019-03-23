import * as React from "react"

import { Form, Formik, FormikErrors, FormikActions } from "formik"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import { Currency } from "~/models/Currency"
import UIField from "~/components/UI/Field"
import { CreateFormProps } from "~/components/UI/Forms/Create"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetFormsCreateValues {
  name: string
  currency: string
}

export interface BudgetFormsCreateProps {
  currencies: Currency[]
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetFormsCreate: React.SFC<
  BudgetFormsCreateProps & CreateFormProps<BudgetFormsCreateValues>
> = ({ currencies, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        currency: currencies[0].id,
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
            <Grid container justify="flex-end" spacing={16}>
              <Grid item xs={12} md={6}>
                <UIField
                  name="name"
                  TextFieldProps={{
                    id: "name",
                    label: "Name",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UIField
                  name="currency"
                  TextFieldProps={{
                    id: "currency",
                    select: true,
                    SelectProps: {
                      native: true,
                    },
                    label: "Currency",
                    children: currencies.map(currency => (
                      <option key={currency.id} value={currency.id}>
                        {currency.id}
                      </option>
                    )),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  data-testid="budget_create"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default BudgetFormsCreate
