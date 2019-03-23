import { schema } from "normalizr"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
interface CurrencyModel {
  /**
   * ISO 4217 compliant code
   */
  code: string

  /**
   * Name of the currency in English
   */
  name: string
}
export interface Currency {
  id: string
  name: string
}
export interface CurrencyNormalized extends Currency {}

// ---------------------------------------------------------------------------------------------------------------------
// Normalizr
// ---------------------------------------------------------------------------------------------------------------------
export const currencySchema = new schema.Entity(
  "currencies",
  {},
  {
    idAttribute: "code",
  }
)
