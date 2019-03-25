export enum AccountType {
  Bank = "BANK",
  Cash = "CASH",
  CreditCard = "CREDIT_CARD",
}

export interface CreateAccountInput {
  type: AccountType
  name: string
  budgetId: string
  initialBalance: number
}
