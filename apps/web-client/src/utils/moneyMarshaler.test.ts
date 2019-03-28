import { marshalMoney, unmarshalMoney } from "./moneyMarshaler"

describe("moneyMarshaler", () => {
  it("marshals money correctly", () => {
    const fixture = new Map([
      [0, 0],
      [11, 1100],
      [1.2, 120],
      [12.347, 1234],
      [12.341, 1234],
      [-56.34, -5634],
      [0.01, 1],
    ])

    fixture.forEach((exp, input) => {
      const output = marshalMoney(input)
      expect(output).toEqual(exp)
    })
  })

  it("unmarshals money correctly", () => {
    const fixture = new Map([
      [0, 0],
      [1100, 11],
      [120, 1.2],
      [12347, 123.47],
      [1234, 12.34],
      [1, 0.01],
    ])

    fixture.forEach((exp, input) => {
      const output = unmarshalMoney(input)
      expect(output).toEqual(exp)
    })
  })
})
