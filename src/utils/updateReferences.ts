import merge from "lodash/merge"
import { DeepPartial } from "redux"

export default function updateReferences<S, N>(
  state: S,
  idProperty: string,
  referencesProperty: string,
  normalizedData: N
) {
  return merge(
    state,
    Object.values(normalizedData).reduce<DeepPartial<S>>(
      (acc, instance) =>
        merge(acc, {
          [instance[idProperty]]: {
            [referencesProperty]: [instance.id],
          },
        }),
      {}
    )
  )
}
