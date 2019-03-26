import * as React from "react"

import { Form, Formik, FormikErrors, FormikActions } from "formik"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { AccountType } from "~/types/Account"
import { CreateFormProps } from "~/components/UI/Forms/Create"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface AccountFormsCreateValues {
  name: string
  type: AccountType
  initialBalance: number
}

export interface AccountFormsCreateProps {}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const AccountFormsCreate: React.SFC<
  AccountFormsCreateProps & CreateFormProps<AccountFormsCreateValues>
> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        type: AccountType.Bank,
        initialBalance: 0,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const errors: FormikErrors<AccountFormsCreateValues> = {}
        if (!values.name) errors.name = "Add a name to your account"
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
                  name="type"
                  TextFieldProps={{
                    id: "type",
                    select: true,
                    label: "Type",
                    children: [
                      {
                        label: "Bank",
                        value: AccountType.Bank,
                      },
                      {
                        label: "Cash",
                        value: AccountType.Cash,
                      },
                      {
                        label: "Credit Card",
                        value: AccountType.CreditCard,
                      },
                    ].map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    )),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UIField
                  name="initialBalance"
                  TextFieldProps={{
                    id: "initialBalance",
                    label: "Initial balance",
                    type: "number",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  data-testid="account_create"
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

export default AccountFormsCreate
