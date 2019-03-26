import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Currency {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string
}
