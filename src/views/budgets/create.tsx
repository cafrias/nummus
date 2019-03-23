import * as React from "react"
import { connect } from "react-redux"

import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"

import { Currency } from "~/models/Currency"
import { StoreState } from "~/store"
import BudgetFormsCreate from "~/components/Budget/Forms/Create"
import { CreateBudgetInput } from "~/services/BudgetService"

import { navigate } from "@reach/router"
import { StoreUIActionCreators } from "~/store/ui"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetCreate: React.SFC<BudgetCreateProps> = props => {
  return (
    <BudgetCreateInitQuery query={BudgetCreateInitQuery.gql}>
      {res => {
        if (res.loading) return "Loading ..."
        if (res.error) return "Something went wrong"

        const currencies: Currency[] = res.data.currencies

        return (
          <BudgetCreateMutation mutation={BudgetCreateMutation.gql}>
            {createBudget => {
              return (
                <BudgetFormsCreate
                  currencies={currencies}
                  onSubmit={async values => {
                    const result = await createBudget({
                      variables: {
                        input: {
                          name: values.name,
                          currencyCode: values.currency,
                          userId: "1",
                        },
                      },
                    })
                    // TODO: handle void case
                    if (!result) return

                    props.openSnackbar(
                      `Budget '${values.name}' created successfully`
                    )

                    navigate(
                      `/budgets/${result.data.createBudget.id}/accounts/create`
                    )
                  }}
                />
              )
            }}
          </BudgetCreateMutation>
        )
      }}
    </BudgetCreateInitQuery>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetCreateProps
  extends StateProps,
    DispatchProps,
    OwnProps {}

interface StateProps {}

interface DispatchProps {
  openSnackbar: (message: string) => void
}

interface OwnProps {
  path?: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetCreateInitQuery extends Query<{
  currencies: Currency[]
}> {
  static gql = gql`
    query BudgetCreateInit {
      currencies {
        id
        name
      }
    }
  `
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetCreateMutation extends Mutation<
  {
    createBudget: { id: string }
  },
  {
    input: CreateBudgetInput
  }
> {
  static gql = gql`
    mutation CreateBudget($input: CreateBudgetInput) {
      createBudget(input: $input) {
        id
      }
    }
  `
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  null,
  {
    openSnackbar: StoreUIActionCreators.openSnackbar,
  }
)(BudgetCreate)
