import BudgetService from "./BudgetService"
import AccountService from "./AccountService"
import TransactionService from "./TransactionService"
import SpendCategoryService from "./SpendCategoryService";

const services = {
  account: new AccountService(),
  budget: new BudgetService(),
  transaction: new TransactionService(),
  spendCategory: new SpendCategoryService(),
}

export default services
