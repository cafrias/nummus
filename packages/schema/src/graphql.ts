type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Account = {
  id: Scalars["ID"]
  type: AccountType
  name: Scalars["String"]
  budget: Budget
  balance: Scalars["Int"]
  records: Array<Record>
}

export enum AccountType {
  Bank = "BANK",
  Cash = "CASH",
  CreditCard = "CREDIT_CARD",
}

export type Budget = {
  id: Scalars["ID"]
  name: Scalars["String"]
  user: User
  currency: Currency
  accounts: Array<Account>
  categories: Array<SpendCategory>
}

export type CreateAccountInput = {
  type: AccountType
  name: Scalars["String"]
  budgetId: Scalars["ID"]
  initialBalance: Scalars["Int"]
}

export type CreateBudgetInput = {
  name: Scalars["String"]
  currencyCode: Scalars["String"]
  userId: Scalars["ID"]
}

export type CreateTransactionInput = {
  accountId: Scalars["ID"]
  categoryId?: Maybe<Scalars["ID"]>
  amount: Scalars["Int"]
  incoming: Scalars["Boolean"]
}

export type CreateTransferInput = {
  amount: Scalars["Int"]
  destination: Scalars["ID"]
  origin: Scalars["ID"]
}

export type CreateTransferOutput = {
  origin: Transfer
  destination: Transfer
}

export type Currency = {
  id: Scalars["ID"]
  name: Scalars["String"]
}

export type Mutation = {
  createBudget: Budget
  createAccount: Account
  createTransaction: Transaction
  createTransfer: CreateTransferOutput
}

export type MutationCreateBudgetArgs = {
  input?: Maybe<CreateBudgetInput>
}

export type MutationCreateAccountArgs = {
  input?: Maybe<CreateAccountInput>
}

export type MutationCreateTransactionArgs = {
  input?: Maybe<CreateTransactionInput>
}

export type MutationCreateTransferArgs = {
  input?: Maybe<CreateTransferInput>
}

export type Query = {
  accounts: Array<Account>
  budgets: Array<Budget>
  budget: Budget
  currencies: Array<Currency>
  me: User
  spendCategories: Array<SpendCategory>
  toBeBudgeted: Array<Transaction>
}

export type QueryAccountsArgs = {
  budgetId: Scalars["ID"]
}

export type QueryBudgetsArgs = {
  userId: Scalars["String"]
}

export type QueryBudgetArgs = {
  budgetId: Scalars["ID"]
}

export type QuerySpendCategoriesArgs = {
  budgetId: Scalars["ID"]
}

export type QueryToBeBudgetedArgs = {
  budgetId: Scalars["ID"]
}

export type Record = {
  id: Scalars["ID"]
  type: RecordType
  account: Account
  amount: Scalars["Int"]
  incoming: Scalars["Boolean"]
}

export enum RecordType {
  Transfer = "Transfer",
  Transaction = "Transaction",
}

export type SpendCategory = {
  id: Scalars["ID"]
  name: Scalars["String"]
  group: SpendGroup
  budget: Budget
  budgeted: Scalars["Int"]
  transactions: Array<Transaction>
}

export enum SpendGroup {
  ImmediateObligations = "IMMEDIATE_OBLIGATIONS",
  TrueExpenses = "TRUE_EXPENSES",
}

export type Transaction = Record & {
  id: Scalars["ID"]
  account: Account
  type: RecordType
  amount: Scalars["Int"]
  incoming: Scalars["Boolean"]
  category?: Maybe<SpendCategory>
}

export type Transfer = Record & {
  id: Scalars["ID"]
  account: Account
  type: RecordType
  amount: Scalars["Int"]
  incoming: Scalars["Boolean"]
  pair: Transfer
}

export type User = {
  id: Scalars["ID"]
  budgets: Array<Budget>
}

import { GraphQLResolveInfo } from "graphql"

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export type AccountResolvers<Context = any, ParentType = Account> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>
  type?: Resolver<AccountType, ParentType, Context>
  name?: Resolver<Scalars["String"], ParentType, Context>
  budget?: Resolver<Budget, ParentType, Context>
  balance?: Resolver<Scalars["Int"], ParentType, Context>
  records?: Resolver<Array<Record>, ParentType, Context>
}

export type BudgetResolvers<Context = any, ParentType = Budget> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>
  name?: Resolver<Scalars["String"], ParentType, Context>
  user?: Resolver<User, ParentType, Context>
  currency?: Resolver<Currency, ParentType, Context>
  accounts?: Resolver<Array<Account>, ParentType, Context>
  categories?: Resolver<Array<SpendCategory>, ParentType, Context>
}

export type CreateTransferOutputResolvers<
  Context = any,
  ParentType = CreateTransferOutput
> = {
  origin?: Resolver<Transfer, ParentType, Context>
  destination?: Resolver<Transfer, ParentType, Context>
}

export type CurrencyResolvers<Context = any, ParentType = Currency> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>
  name?: Resolver<Scalars["String"], ParentType, Context>
}

export type MutationResolvers<Context = any, ParentType = Mutation> = {
  createBudget?: Resolver<Budget, ParentType, Context, MutationCreateBudgetArgs>
  createAccount?: Resolver<
    Account,
    ParentType,
    Context,
    MutationCreateAccountArgs
  >
  createTransaction?: Resolver<
    Transaction,
    ParentType,
    Context,
    MutationCreateTransactionArgs
  >
  createTransfer?: Resolver<
    CreateTransferOutput,
    ParentType,
    Context,
    MutationCreateTransferArgs
  >
}

export type QueryResolvers<Context = any, ParentType = Query> = {
  accounts?: Resolver<Array<Account>, ParentType, Context, QueryAccountsArgs>
  budgets?: Resolver<Array<Budget>, ParentType, Context, QueryBudgetsArgs>
  budget?: Resolver<Budget, ParentType, Context, QueryBudgetArgs>
  currencies?: Resolver<Array<Currency>, ParentType, Context>
  me?: Resolver<User, ParentType, Context>
  spendCategories?: Resolver<
    Array<SpendCategory>,
    ParentType,
    Context,
    QuerySpendCategoriesArgs
  >
  toBeBudgeted?: Resolver<
    Array<Transaction>,
    ParentType,
    Context,
    QueryToBeBudgetedArgs
  >
}

export type RecordResolvers<Context = any, ParentType = Record> = {
  __resolveType: TypeResolveFn<"Transaction" | "Transfer", ParentType, Context>
  id?: Resolver<Scalars["ID"], ParentType, Context>
  type?: Resolver<RecordType, ParentType, Context>
  account?: Resolver<Account, ParentType, Context>
  amount?: Resolver<Scalars["Int"], ParentType, Context>
  incoming?: Resolver<Scalars["Boolean"], ParentType, Context>
}

export type SpendCategoryResolvers<
  Context = any,
  ParentType = SpendCategory
> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>
  name?: Resolver<Scalars["String"], ParentType, Context>
  group?: Resolver<SpendGroup, ParentType, Context>
  budget?: Resolver<Budget, ParentType, Context>
  budgeted?: Resolver<Scalars["Int"], ParentType, Context>
  transactions?: Resolver<Array<Transaction>, ParentType, Context>
}

export type TransactionResolvers<Context = any, ParentType = Transaction> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>
  account?: Resolver<Account, ParentType, Context>
  type?: Resolver<RecordType, ParentType, Context>
  amount?: Resolver<Scalars["Int"], ParentType, Context>
  incoming?: Resolver<Scalars["Boolean"], ParentType, Context>
  category?: Resolver<Maybe<SpendCategory>, ParentType, Context>
}

export type TransferResolvers<Context = any, ParentType = Transfer> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>
  account?: Resolver<Account, ParentType, Context>
  type?: Resolver<RecordType, ParentType, Context>
  amount?: Resolver<Scalars["Int"], ParentType, Context>
  incoming?: Resolver<Scalars["Boolean"], ParentType, Context>
  pair?: Resolver<Transfer, ParentType, Context>
}

export type UserResolvers<Context = any, ParentType = User> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>
  budgets?: Resolver<Array<Budget>, ParentType, Context>
}

export type Resolvers<Context = any> = {
  Account?: AccountResolvers<Context>
  Budget?: BudgetResolvers<Context>
  CreateTransferOutput?: CreateTransferOutputResolvers<Context>
  Currency?: CurrencyResolvers<Context>
  Mutation?: MutationResolvers<Context>
  Query?: QueryResolvers<Context>
  Record?: RecordResolvers
  SpendCategory?: SpendCategoryResolvers<Context>
  Transaction?: TransactionResolvers<Context>
  Transfer?: TransferResolvers<Context>
  User?: UserResolvers<Context>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = any> = Resolvers<Context>
