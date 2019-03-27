import * as React from "react"

import { FormikErrors, FormikProps, Formik, Form, Field } from "formik"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { CreateFormProps } from "~/components/UI/Forms/Create"

import { IdName } from "~/types/IdLabel"
import { RecordFormsCreateValues } from "~/components/Record/Forms/Create"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface TransferFormsCreateValues extends RecordFormsCreateValues {
  destination: string
}

export interface TransferFormsCreateProps {
  accounts: IdName[]
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const TransferFormsCreate: React.SFC<
  TransferFormsCreateProps & CreateFormProps<TransferFormsCreateValues>
> = props => {
  return (
    <Formik
      initialValues={{
        amount: 0,
        account: "",
        destination: "",
      }}
      onSubmit={props.onSubmit}
      validate={values => {
        const errors: FormikErrors<TransferFormsCreateValues> = {}

        if (!values.account) errors.account = "Should select an origin account"

        if (values.amount <= 0) errors.amount = "Should be greater than 0"

        if (!values.destination) {
          errors.destination = "Select a destination account"
        }

        if (values.account && values.account === values.destination) {
          errors.account = "Can't be the same as destination account"
          errors.destination = "Can't be the same as origin account"
        }

        return errors
      }}
    >
      {form => {
        return (
          <Form>
            <Grid container justify="flex-end" spacing={16}>
              <Grid item xs={12} md={6}>
                <UIField
                  name="account"
                  TextFieldProps={{
                    id: "account",
                    label: "Origin account",
                    select: true,
                    children: [
                      <option key={0} value="" />,
                      ...props.accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.name}
                        </option>
                      )),
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UIField
                  name="amount"
                  TextFieldProps={{
                    id: "amount",
                    label: "Amount",
                    type: "number",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UIField
                  name="destination"
                  TextFieldProps={{
                    id: "destination",
                    label: "Destination account",
                    select: true,
                    children: [
                      <option key={0} value="" />,
                      ...props.accounts.map(account => (
                        <option
                          disabled={form.values.account === account.id}
                          key={account.id}
                          value={account.id}
                        >
                          {account.name}
                        </option>
                      )),
                    ],
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  data-testid="transfer_create"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
    // <RecordFormsCreate
    //   accounts={props.accounts}
    //   submitTestId="transfer_create"
    //   initialValues={{ destination: "" }}
    //   validate={(values: TransferFormsCreateValues) => {
    //     const errors: FormikErrors<TransferFormsCreateValues> = {}

    // if (!values.destination) {
    //   errors.destination = "Select a destination account"
    // }

    // if (values.account && values.account === values.destination) {
    //   errors.account = "Can't be the same as destination account"
    //   errors.destination = "Can't be the same as origin account"
    // }

    //     return errors
    //   }}
    //   onSubmit={props.onSubmit}
    // >
    //   {(form: FormikProps<TransferFormsCreateValues>) => (
    // <Grid item xs={12} md={6}>
    //   <UIField
    //     name="destination"
    //     TextFieldProps={{
    //       id: "destination",
    //       label: "Destination account",
    //       select: true,
    //       children: [
    //         <option key={0} value="" />,
    //         ...props.accounts.map(account => (
    //           <option
    //             disabled={form.values.account === account.id}
    //             key={account.id}
    //             value={account.id}
    //           >
    //             {account.name}
    //           </option>
    //         )),
    //       ],
    //     }}
    //   />
    // </Grid>
    //   )}
    // </RecordFormsCreate>
  )
}

export default TransferFormsCreate
