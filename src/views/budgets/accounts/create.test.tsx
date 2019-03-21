import * as React from "react"
import { cleanup, RenderResult, fireEvent, wait } from "react-testing-library"

// Utils
import "jest-dom/extend-expect"
import renderWithRedux, {
  RenderWithReduxResult,
} from "~/utils/test/renderWithRedux"

// Router
import { navigate } from "@reach/router"
jest.mock("@reach/router")

const navigateMock = navigate as jest.Mock<typeof navigate>

// Redux
import StoreUIReducer, { StoreUIState } from "~/store/ui"
import { combineReducers } from "redux"
import { StoreAccountThunks } from "~/store/account"

// Components
import AccountCreate from "./create"
import UISnackbar from "~/components/UI/Snackbar"
import { AccountFormsCreateValues } from "~/components/Account/Forms/Create"
import { AccountType, Account } from "~/models/Account"

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
  let wrapper: RenderWithReduxResult<PartialState>

  beforeEach(() => {
    wrapper = renderWithRedux(
      <>
        <AccountCreate budgetId="1" />
        <UISnackbar />
      </>,
      {
        reducer,
      }
    )
  })

  it("creates new account", async () => {
    const input: AccountFormsCreateValues = {
      name: "My account",
      type: AccountType.CreditCard,
    }
    const newAccount: Account = {
      id: "1",
      budget: "1",
      inTransactions: [],
      outTransactions: [],
      initialBalance: 0,
      name: input.name,
      type: input.type,
    }

    StoreAccountThunks.create = jest.fn(() => async _ => newAccount)

    submitForm(wrapper, input)

    await wait(() => {
      // Calls thunk
      expect(StoreAccountThunks.create).toHaveBeenCalledWith({
        budgetId: "1",
        ...input,
      })

      // Shows message to the user
      expect(
        wrapper.getByText(`Account '${input.name}' created successfully`)
      ).toBeVisible()

      // Redirects to create account
      expect(navigateMock).toHaveBeenCalledWith("/budgets/1")
    })
  })
})

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
function submitForm(wrapper: RenderResult, input: AccountFormsCreateValues) {
  fireEvent.change(wrapper.getByLabelText("Name"), {
    target: { value: input.name },
  })
  fireEvent.change(wrapper.getByLabelText("Type"), {
    target: { value: input.type },
  })

  fireEvent.click(wrapper.getByTestId("account_create"))
}
