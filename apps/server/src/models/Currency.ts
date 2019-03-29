import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Currency {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  constructor(input?: Partial<Currency>) {
    if (input) {
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          this[key] = input[key]
        }
      }
    }
  }
}
