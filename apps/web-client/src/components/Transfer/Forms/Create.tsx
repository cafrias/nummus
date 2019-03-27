import * as React from "react"

import { FormikErrors, FormikProps } from "formik"

import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { CreateFormProps } from "~/components/UI/Forms/Create"

import { IdName } from "~/types/IdLabel"
import RecordFormsCreate, {
  RecordFormsCreateValues,
} from "~/components/Record/Forms/Create"

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
    <RecordFormsCreate
      accounts={props.accounts}
      submitTestId="transfer_create"
      initialValues={{ destination: "" }}
      validate={(values: TransferFormsCreateValues) => {
        const errors: FormikErrors<TransferFormsCreateValues> = {}

        if (!values.destination) {
          errors.destination = "Select a destination account"
        }

        if (values.account && values.account === values.destination) {
          errors.account = "Can't be the same as destination account"
          errors.destination = "Can't be the same as origin account"
        }

        return errors
      }}
      onSubmit={props.onSubmit}
    >
      {(form: FormikProps<TransferFormsCreateValues>) => (
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
      )}
    </RecordFormsCreate>
  )
}

export default TransferFormsCreate
