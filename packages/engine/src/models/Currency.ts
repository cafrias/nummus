export default class Currency {
  constructor(
    /**
     * ISO 4217 compliant currency code
     */
    private isoCode: string,
    /**
     * English name of the currency
     */
    private name: string
  ) {}

  public getIsoCode() {
    return this.isoCode
  }

  public getName() {
    return this.name
  }
}
