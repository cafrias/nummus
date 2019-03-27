import * as React from "react"

import { FormikErrors } from "formik"

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
  accountId: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const TransferFormsCreate: React.SFC<
  TransferFormsCreateProps & CreateFormProps<TransferFormsCreateValues>
> = props => {
  return (
    <RecordFormsCreate
      accountId={props.accountId}
      submitTestId="transfer_create"
      initialValues={{ destination: "" }}
      validate={(values: TransferFormsCreateValues) => {
        const errors: FormikErrors<TransferFormsCreateValues> = {}
        if (!values.destination)
          errors.destination = "Select a destination account"
        return errors
      }}
      onSubmit={props.onSubmit}
    >
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
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              )),
            ],
          }}
        />
      </Grid>
    </RecordFormsCreate>
  )
}

export default TransferFormsCreate
