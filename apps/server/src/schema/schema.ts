import { gql } from "apollo-server"

const schema = gql`
  type Query {
    accounts(budgetId: ID!): [Account!]!

    budgets(userId: String!): [Budget!]!

    spendCategories: [SpendCategory!]!

    currencies: [Currency!]!

    me: User!
  }

  type Mutation {
    createBudget(input: CreateBudgetInput): Budget!

    createAccount(input: CreateAccountInput): Account!

    createTransaction(input: CreateTransactionInput): Transaction!
    createTransfer(input: CreateTransferInput): CreateTransferOutput!
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # Account
  # ----------------------------------------------------------------------------------------------------------------------
  type Account {
    id: ID!
    type: AccountType!
    name: String!
    budget: Budget!
    initialBalance: Int!
    records: [Record!]!
  }

  input CreateAccountInput {
    type: AccountType!
    name: String!
    budgetId: ID!
    initialBalance: Int!
  }

  enum AccountType {
    BANK
    CASH
    CREDIT_CARD
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # Currency
  # ----------------------------------------------------------------------------------------------------------------------
  type Currency {
    # ISO 4217 compliant currency code
    id: ID!
    # Name of the currency in English
    name: String!
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # Budget
  # ----------------------------------------------------------------------------------------------------------------------
  type Budget {
    id: ID!
    name: String!
    user: User!
    currency: Currency!
    accounts: [Account!]!
  }

  input CreateBudgetInput {
    name: String!
    # ISO 4217 compliant currency code
    currencyCode: String!
    userId: ID!
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # Record
  # ----------------------------------------------------------------------------------------------------------------------
  interface Record {
    id: ID!
    type: RecordType!
    account: Account!
    amount: Int!
    incoming: Boolean!
  }

  enum RecordType {
    Transfer
    Transaction
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # Spend Category
  # ----------------------------------------------------------------------------------------------------------------------
  type SpendCategory {
    id: ID!
    name: String!
    group: SpendGroup!
  }

  enum SpendGroup {
    IMMEDIATE_OBLIGATIONS
    TRUE_EXPENSES
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # Transaction
  # ----------------------------------------------------------------------------------------------------------------------
  type Transaction implements Record {
    id: ID!
    account: Account!
    type: RecordType!
    amount: Int!
    incoming: Boolean!

    category: SpendCategory!
  }

  input CreateTransactionInput {
    accountId: ID!
    categoryId: ID!
    amount: Int!
    incoming: Boolean!
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # Transfer
  # ----------------------------------------------------------------------------------------------------------------------
  type Transfer implements Record {
    id: ID!
    account: Account!
    type: RecordType!
    amount: Int!
    incoming: Boolean!

    pair: Transfer!
  }

  input CreateTransferInput {
    amount: Int!
    destination: ID!
    origin: ID!
  }

  type CreateTransferOutput {
    origin: Transfer!
    destination: Transfer!
  }

  # ----------------------------------------------------------------------------------------------------------------------
  # User
  # ----------------------------------------------------------------------------------------------------------------------
  type User {
    id: ID!
    budgets: [Budget!]!
  }
`

export default schema
