import * as React from "react"

import { Form, Formik, FormikErrors, FormikActions } from "formik"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { AccountType, Account } from "~/models/Account"
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

import { makeStyles, createStyles, getThemeProps } from "@material-ui/styles"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface TransactionFormsCreateValues {
  amount: number
  account: string
}

export interface TransactionFormsCreateProps {
  accounts: Account[]
  accountId: string
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
> = ({ onSubmit, accounts, accountId }) => {
  const [incoming, setIncoming] = React.useState(false)
  const classes = useStyles()

  return (
    <Formik
      initialValues={{
        amount: 0,
        account: "",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const errors: FormikErrors<TransactionFormsCreateValues> = {}
        if (!values.amount) errors.amount = "Add amount"
        return errors
      }}
    >
      {form => {
        return (
          <Form>
            <Grid container justify="flex-end" spacing={16}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={incoming}
                      onChange={() => setIncoming(!incoming)}
                      value="incoming"
                    />
                  }
                  label="Incoming"
                />
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
                  name="account"
                  TextFieldProps={{
                    id: "account",
                    label: incoming ? "From" : "To",
                    select: true,
                    children: [
                      <option key={0} value="" />,
                      ...accounts.map(account => (
                        <option
                          disabled={account.id === accountId}
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

export default TransactionFormsCreate
