import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Budget } from "./Budget"

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
