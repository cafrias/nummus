import { OneToOne, JoinColumn, ChildEntity } from "typeorm"
import { Record } from "./Record"

@ChildEntity()
export class Transfer extends Record {
  @OneToOne(type => Transfer)
  @JoinColumn()
  pair: Transfer
}
