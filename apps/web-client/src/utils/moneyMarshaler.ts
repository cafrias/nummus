const PRECISION = 100

export function marshalMoney(money: number): number {
  return Math.floor(money * PRECISION)
}

export function unmarshalMoney(marshaledMoney: number): number {
  return marshaledMoney / PRECISION
}
