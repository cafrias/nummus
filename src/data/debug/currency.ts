import { CurrencyNormalized } from "~/models/Currency"
import { NormalizedTree } from "~/models/NormalizedTree"

const dataDebugCurrencies: NormalizedTree<CurrencyNormalized> = {
  ARS: {
    code: "ARS",
    name: "Argentine Peso",
  },
  USD: {
    code: "USD",
    name: "United States Dollar",
  },
}

export default dataDebugCurrencies
