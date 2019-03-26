import * as React from "react"

import { Form, Formik, FormikErrors, Field, FieldProps } from "formik"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { CreateFormProps } from "~/components/UI/Forms/Create"

import classNames from "classnames"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import InputAdornment from "@material-ui/core/InputAdornment"
import green from "@material-ui/core/colors/green"
import deepOrange from "@material-ui/core/colors/deepOrange"

import Icon from "@material-ui/core/Icon"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

import { makeStyles, createStyles } from "@material-ui/styles"
import { IdName } from "~/types/IdLabel"
import { SpendGroup } from "schema"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface TransactionFormsCreateValues {
  amount: number
  incoming: boolean
  category: string
}

export interface TransactionFormsCreateProps {
  categories: GroupedCategories
  accountId: string
}

export type GroupedCategories = { [k: string]: IdName[] }

const groupLabels = {
  [SpendGroup.Immediate_Obligations]: "Immediate Obligations",
  [SpendGroup.True_Expenses]: "True Expenses",
}

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
// Component
// ---------------------------------------------------------------------------------------------------------------------
const TransactionFormsCreate: React.SFC<
  TransactionFormsCreateProps & CreateFormProps<TransactionFormsCreateValues>
> = ({ onSubmit, categories }) => {
  const classes = useStyles()

  return (
    <Formik
      initialValues={{
        amount: 0,
        incoming: false,
        category: "",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const errors: FormikErrors<TransactionFormsCreateValues> = {}
        if (values.amount <= 0) errors.amount = "Should be greater than 0"
        if (!values.category) errors.category = "Select a category"
        return errors
      }}
    >
      {form => {
        const { incoming } = form.values
        return (
          <Form>
            <Grid container justify="flex-end" spacing={16}>
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
                    children: [
                      <option key={0} value="" />,
                      renderCategories(categories),
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
