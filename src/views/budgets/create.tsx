import * as React from "react"
import { connect } from "react-redux"

import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

import { Currency } from "~/models/Currency"
import { StoreState, SimpleThunkDispatch } from "~/store"
import { StoreCurrencySelectors } from "~/store/currency"
import { StoreBudgetThunks, StoreBudgetCreateThunk } from "~/store/budget"
import BudgetFormsCreate, {
  BudgetFormsCreateProps,
  BudgetFormsCreateValues,
} from "~/components/Budget/Forms/Create"
import { CreateBudgetInput } from "~/services/BudgetService"

import { navigate } from "@reach/router"
import { StoreUIActionCreators } from "~/store/ui"
import UIFormsCreate from "~/components/UI/Forms/Create"

// ---------------------------------------------------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------------------------------------------------
export const BudgetCreateQueries = {
  init: gql`
    query BudgetCreateInit {
      currencies {
        id
        name
      }
    }
  `
}
export interface BudgetCreateQueriesGetCurrenciesResult {
  currencies: {
    id: string
    name: string
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------
export const BudgetCreateMutations = {
  createBudget: gql`
    mutation CreateBudget($input: CreateBudgetInput) {
            createBudget(input: $input) {
              id
            }
          }
  `
}
export interface BudgetCreateMutationsCreateBudgetResult {
  createBudget: {
    id: string
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetCreate: React.SFC<BudgetCreateProps> = ({
  createBudget,
  openSnackbar,
}) => {
  return <Query query={BudgetCreateQueries.init}>
    {(res) => {
      if (res.loading) return 'Loading ...'
      if (res.error) return 'Something went wrong'

      const currencies: Currency[] = res.data.currencies

      return <Mutation
        mutation={BudgetCreateMutations.createBudget}
      >
        {
          (createBudget) => {
            return <BudgetFormsCreate currencies={currencies} onSubmit={async (values) => {
              const result = await createBudget({
                variables: {
                  input: {
                    name: values.name,
                    currencyCode: values.currency,
                    userId: "1"
                  }
                }
              })

              openSnackbar(`Budget '${values.name}' created successfully`)

              navigate(`/budgets/${(result as any).data.createBudget.id}/accounts/create`)
            }}/>
          }
        }
        </Mutation>
    }}
  </Query>
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetCreateProps
  extends StateProps,
    DispatchProps,
    OwnProps {}

interface StateProps {
}

interface DispatchProps {
  createBudget: StoreBudgetCreateThunk
  openSnackbar: (message: string) => void
}

interface OwnProps {
  path?: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  null,
  (dispatch: SimpleThunkDispatch) => ({
    createBudget: (input: CreateBudgetInput) =>
      dispatch(StoreBudgetThunks.create(input)),
    openSnackbar: (message: string) =>
      dispatch(StoreUIActionCreators.openSnackbar(message)),
  })
)(BudgetCreate)
