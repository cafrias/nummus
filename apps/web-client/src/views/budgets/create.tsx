import * as React from "react"
import { connect } from "react-redux"

import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"

import { StoreState } from "~/store"
import BudgetFormsCreate from "~/components/Budget/Forms/Create"

import { navigate } from "@reach/router"
import { StoreUIActionCreators } from "~/store/ui"
import { IdName } from "~/types/IdLabel"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetCreate: React.SFC<BudgetCreateProps> = props => {
  return (
    <BudgetCreateInitQuery query={BudgetCreateInitQuery.gql}>
      {res => {
        if (res.loading) return "Loading ..."
        if (res.error) return "Something went wrong"

        const currencies: IdName[] = res.data.currencies

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
                          // TODO: use currently logged-in user
                          userId: res.data.me.id,
                        },
                      },
                    })
                    // TODO: handle void case
                    if (!result) return

                    props.openSnackbar("Budget created")

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
export interface BudgetCreateProps extends DispatchProps, OwnProps {}

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
  currencies: IdName[]
  me: { id: string }
}> {
  static gql = gql`
    query BudgetCreateInit {
      currencies {
        id
        name
      }

      me {
        id
      }
    }
  `
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetCreateMutation extends Mutation<{
  createBudget: { id: string }
}> {
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
export default connect<{}, DispatchProps, OwnProps, StoreState>(
  null,
  {
    openSnackbar: StoreUIActionCreators.openSnackbar,
  }
)(BudgetCreate)
