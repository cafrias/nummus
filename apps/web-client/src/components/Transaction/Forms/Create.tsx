import * as React from "react"

import { FormikErrors } from "formik"

import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { CreateFormProps } from "~/components/UI/Forms/Create"
import { IdName } from "~/types/IdLabel"
import { SpendGroup } from "@nummus/schema"
import RecordFormsCreate, {
  RecordFormsCreateValues,
} from "~/components/Record/Forms/Create"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface TransactionFormsCreateValues extends RecordFormsCreateValues {
  category: string
}

export interface TransactionFormsCreateProps {
  categories: GroupedCategories
  accountId: string
}

export type GroupedCategories = { [k: string]: IdName[] }

const groupLabels = {
  [SpendGroup.ImmediateObligations]: "Immediate Obligations",
  [SpendGroup.TrueExpenses]: "True Expenses",
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const TransactionFormsCreate: React.SFC<
  TransactionFormsCreateProps & CreateFormProps<TransactionFormsCreateValues>
> = props => {
  return (
    <RecordFormsCreate
      accountId={props.accountId}
      submitTestId="transaction_create"
      initialValues={{ category: "" }}
      validate={(values: TransactionFormsCreateValues) => {
        const errors: FormikErrors<TransactionFormsCreateValues> = {}
        if (!values.category) errors.category = "Select a category"
        return errors
      }}
      onSubmit={props.onSubmit}
    >
      <Grid item xs={12} md={6}>
        <UIField
          name="category"
          TextFieldProps={{
            id: "category",
            label: "Category",
            select: true,
            children: [
              <option key={0} value="" />,
              renderCategories(props.categories),
            ],
          }}
        />
      </Grid>
    </RecordFormsCreate>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
function renderCategories(categories: GroupedCategories): React.ReactNode {
  const result = []

  for (const group in categories) {
    if (categories.hasOwnProperty(group)) {
      const groupCats: IdName[] = categories[group]

      if (groupCats.length) {
        result.push(
          <optgroup key={group} label={groupLabels[group]}>
            {...groupCats.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </optgroup>
        )
      }
    }
  }

  return result
}

export default TransactionFormsCreate
