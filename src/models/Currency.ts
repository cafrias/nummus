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
export interface Currency extends CurrencyModel {}
export interface CurrencyNormalized extends CurrencyModel {}

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
