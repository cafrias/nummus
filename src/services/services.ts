import BudgetService from "./BudgetService"
import AccountService from "./AccountService"

const services = {
  account: new AccountService(),
  budget: new BudgetService(),
}

export default services
