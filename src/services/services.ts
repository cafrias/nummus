import BudgetService from "./BudgetService"
import AccountService from "./AccountService"
import TransactionService from "./TransactionService"

const services = {
  account: new AccountService(),
  budget: new BudgetService(),
  transaction: new TransactionService(),
}

export default services
