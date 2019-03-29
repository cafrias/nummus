import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Budget } from "./Budget"
import { UserResolvers } from "@nummus/schema"
import { Context } from ".."

// ---------------------------------------------------------------------------------------------------------------------
// Entity
// ---------------------------------------------------------------------------------------------------------------------
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany(type => Budget, budget => budget.user)
  budgets: Budget[]

  constructor(input?: Partial<User>) {
    if (input) {
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          this[key] = input[key]
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------------------------------------------------
export const UserResolver: UserResolvers<Context> = {
  budgets(user, _, { orm }) {
    return orm.getRepository(Budget).find({ where: { user: { id: user.id } } })
  },
}
