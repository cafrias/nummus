import * as React from "react"

import { FormikErrors, Formik, Form, Field, FieldProps } from "formik"

import classNames from "classnames"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { CreateFormProps } from "~/components/UI/Forms/Create"
import { IdName } from "~/types/IdLabel"
import { SpendGroup } from "@nummus/schema"
import { RecordFormsCreateValues } from "~/components/Record/Forms/Create"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import InputAdornment from "@material-ui/core/InputAdornment"

import Icon from "@material-ui/core/Icon"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

import { makeStyles, createStyles } from "@material-ui/styles"

import green from "@material-ui/core/colors/green"
import deepOrange from "@material-ui/core/colors/deepOrange"

// ---------------------------------------------------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles(() =>
  createStyles({
    amountAdornment: {
      color: deepOrange[500],
    },
    incoming: {
      color: green[500],
    },
  })
)

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface TransactionFormsCreateValues extends RecordFormsCreateValues {
  category: string
  incoming: boolean
}

export interface TransactionFormsCreateProps {
  categories: GroupedCategories
  accounts: IdName[]
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
  const classes = useStyles()
  return (
    <Formik
      initialValues={{
        amount: 0,
        incoming: false,
        account: "",
        category: "",
      }}
      onSubmit={props.onSubmit}
      validate={values => {
        const errors: FormikErrors<TransactionFormsCreateValues> = {}
        if (!values.account) errors.account = "Should select an origin account"
        if (values.amount <= 0) errors.amount = "Should be greater than 0"
        return errors
      }}
    >
      {form => {
        const { incoming } = form.values
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
                <Field name="incoming">
                  {({ field }: FieldProps) => (
                    <FormControlLabel
                      control={<Switch {...field} checked={field.value} />}
                      label="Incoming"
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <UIField
                  name="amount"
                  TextFieldProps={{
                    id: "amount",
                    label: "Amount",
                    type: "number",
                    InputProps: {
                      startAdornment: (
                        <InputAdornment disableTypography position="start">
                          <Icon
                            className={classNames(classes.amountAdornment, {
                              [classes.incoming]: incoming,
                            })}
                          >
                            {incoming ? <AddIcon /> : <RemoveIcon />}
                          </Icon>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <UIField
                  name="category"
                  TextFieldProps={{
                    id: "category",
                    label: "Category",
                    select: true,
                    helperText: "If empty, it goes to 'To be budgeted'",
                    children: [
                      <option key={0} value="" />,
                      renderCategories(props.categories),
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
                  data-testid="transaction_create"
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
