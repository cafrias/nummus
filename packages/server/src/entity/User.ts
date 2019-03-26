import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Budget } from "./Budget"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToMany(type => Budget, budget => budget.user)
  budgets: Budget[]
}
