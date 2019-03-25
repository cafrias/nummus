/**
 * `SpendGroup` groups a number of `SpendCategories`, it's meant to give them some context, you won't attach a `Transaction`
 * directly to a `SpendGroup`, you do that to `SpendCategories` instead. Example:
 *
 * > __Immediate Obligations__ is a `SpendGroup` that groups `SpendCategories` like _Rent/Mortgage_, _Electric_, and _Internet_.
 */
export enum SpendGroup {
  ImmediateObligations = "IMMEDIATE_OBLIGATIONS",
}
