import * as React from "react"
import { cleanup, wait } from "react-testing-library"

// Utils
import "jest-dom/extend-expect"
import renderWithRedux from "~/utils/test/renderWithRedux"

// Router
import { navigate } from "@reach/router"
jest.mock("@reach/router")

const navigateMock = navigate as jest.Mock<typeof navigate>

// Redux
import StoreUIReducer, { StoreUIState } from "~/store/ui"
import { combineReducers } from "redux"

// Components
import AccountCreate, { BudgetsAccountsCreateMutation } from "./create"
import UISnackbar from "~/components/UI/Snackbar"
import { AccountFormsCreateValues } from "~/components/Account/Forms/Create"
import { AccountType, CreateAccountInput } from "~/types/Account"
import { MockedProvider } from "react-apollo/test-utils"
import { fillAndSubmitAccountFormsCreate } from "~/components/Account/Forms/Create.test"
import { marshalMoney } from "~/utils/moneyMarshaler"

// ---------------------------------------------------------------------------------------------------------------------
// Redux setup
// ---------------------------------------------------------------------------------------------------------------------
interface PartialState {
  ui: StoreUIState
}
const reducer = combineReducers<PartialState>({
  ui: StoreUIReducer,
})

// ---------------------------------------------------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------------------------------------------------
afterEach(cleanup)

// ---------------------------------------------------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------------------------------------------------
describe("Account: create view", () => {
  it("creates new account", async () => {
    //
    // Setup
    //
    const budgetId = "1"
    const formValues: AccountFormsCreateValues = {
      name: "My account",
      type: AccountType.CreditCard,
      initialBalance: 550.5,
    }
    const input: CreateAccountInput = {
      budgetId,
      // Already parsed initial balance
      initialBalance: marshalMoney(formValues.initialBalance),
      name: formValues.name,
      type: formValues.type,
    }

    const wrapper = renderWithRedux(
      <MockedProvider
        mocks={[
          //
          // Create Mutation
          //
          {
            request: {
              query: BudgetsAccountsCreateMutation.gql,
              variables: {
                input,
              },
            },
            result: {
              data: {
                createAccount: {
                  id: "1",
                },
              },
            },
          },
        ]}
        addTypename={false}
      >
        <>
          <AccountCreate budgetId={budgetId} />
          <UISnackbar />
        </>
      </MockedProvider>,
      {
        reducer,
      }
    )

    //
    // Action
    //
    fillAndSubmitAccountFormsCreate(wrapper, formValues)

    //
    // Assert
    //
    await wait(() => {
      // Shows message to the user
      expect(wrapper.getByText("Account created")).toBeVisible()

      // Redirects to create account
      expect(navigateMock).toHaveBeenCalledWith("/budgets/1")
    })
  })
})
