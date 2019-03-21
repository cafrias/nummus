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

// Components
import AccountCreate from "./create"
import UISnackbar from "~/components/UI/Snackbar"

// Services
import services from "~/services/services"
import { AccountFormsCreateValues } from "~/components/Account/Forms/Create"
import { AccountType, Account } from "~/models/Account"
import { CreateAccountInput } from "~/services/AccountService"
import StoreAccountReducer, { StoreAccountState } from "~/store/account"
jest.mock("~/services/AccountService")

// ---------------------------------------------------------------------------------------------------------------------
// Redux setup
// ---------------------------------------------------------------------------------------------------------------------
interface PartialState {
  account: StoreAccountState
  ui: StoreUIState
}
const reducer = combineReducers<PartialState>({
  account: StoreAccountReducer,
  ui: StoreUIReducer,
})

// ---------------------------------------------------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------------------------------------------------
afterEach(cleanup)

beforeEach(() => {
  ;(services.account.create as jest.Mock).mockClear()
})

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
    services.account.create = jest.fn(
      async (_: CreateAccountInput): Promise<Account> => ({
        id: "1",
        budget: "1",
        inTransactions: [],
        outTransactions: [],
        initialBalance: 0,
        name: input.name,
        type: input.type,
      })
    )

    submitForm(wrapper, input)

    await wait(() => {
      // Calls service
      expect(services.account.create).toHaveBeenCalled()
      expect((services.account.create as jest.Mock).mock.calls[0][0]).toEqual({
        budgetId: "1",
        type: input.type,
        name: input.name,
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
