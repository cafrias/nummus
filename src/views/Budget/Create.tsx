import * as React from "react"
import { connect } from "react-redux"

import uuidv4 from "uuid/v4"

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikErrors,
} from "formik"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import MenuItem from "@material-ui/core/MenuItem"

import { Currency } from "~/models/Currency"
import { StoreState } from "~/store"
import { StoreCurrencySelectors } from "~/store/currency"
import { StoreBudgetActionCreators } from "~/store/budget"

export interface BudgetCreateProps
  extends StateProps,
    DispatchProps,
    OwnProps {}

const BudgetCreate: React.SFC<BudgetCreateProps> = ({
  currencies,
  addBudget,
}) => {
  return (
    <Formik
      initialValues={{
        name: "",
        currency: currencies[0].code,
      }}
      onSubmit={values => {
        addBudget([
          {
            id: uuidv4(),
            ...values,
            currency: {
              code: values.currency,
              name: "any",
            },
            user: {
              email: "me@me.com",
              name: "pepe",
            },
          },
        ])
      }}
      validate={values => {
        const errors: FormikErrors<typeof values> = {}
        if (!values.name) errors.name = "Add a name to yout budget"
        return errors
      }}
    >
      {form => (
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
              <TextField {...field} select variant="outlined" label="Currency">
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
      )}
    </Formik>
  )
}

//
// Redux Connection
//
interface StateProps {
  currencies: Currency[]
}

interface DispatchProps {
  addBudget: typeof StoreBudgetActionCreators.add
}

interface OwnProps {}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  state => ({
    currencies: StoreCurrencySelectors.getAll(state),
  }),
  {
    addBudget: StoreBudgetActionCreators.add,
  }
)(BudgetCreate)
