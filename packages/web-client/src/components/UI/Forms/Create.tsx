import * as React from "react"
import { DataErrors } from "~/errors/DataErrors"
import { FormikActions } from "formik"

export interface CreateFormProps<V> {
  onSubmit(values: V, form: FormikActions<V>): Promise<void>
}

export interface IndependentProps {}

export interface DependentProps<P, V>
  extends React.PropsWithChildren<IndependentProps> {
  create: (values: V) => Promise<void>
  FormProps?: P
  component: React.ComponentType<P & CreateFormProps<V>>
}

function UIFormsCreate<P, V>({
  component: Component,
  create,
  FormProps,
}: DependentProps<P, V>) {
  return (
    <Component
      {...FormProps}
      onSubmit={async (values, actions) => {
        try {
          await create(values)
        } catch (err) {
          switch (err.code) {
            case DataErrors.VALIDATION_ERROR:
              actions.setErrors(err.errors)
              break
            default:
              throw err
          }
        }
      }}
    />
  )
}

export default UIFormsCreate
