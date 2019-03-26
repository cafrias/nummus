import { Entity, OneToOne, JoinColumn } from "typeorm"
import { Record } from "./Record"

@Entity()
export class Transfer extends Record {
  @OneToOne(type => Transfer)
  @JoinColumn()
  pair: Transfer
}
