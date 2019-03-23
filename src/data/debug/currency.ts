import { CurrencyNormalized } from "~/models/Currency"
import { NormalizedTree } from "~/models/NormalizedTree"

const dataDebugCurrencies: NormalizedTree<CurrencyNormalized> = {
  ARS: {
    id: "ARS",
    name: "Argentine Peso",
  },
  USD: {
    id: "USD",
    name: "United States Dollar",
  },
}

export default dataDebugCurrencies
