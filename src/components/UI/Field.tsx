import * as React from "react"

import { Field, FieldProps, ErrorMessage } from "formik"

import TextField, { TextFieldProps } from "@material-ui/core/TextField"

export interface UIFieldProps {
  validate?: (v: string) => string
  name: string
  TextFieldProps: TextFieldProps
}

const UIField: React.SFC<UIFieldProps> = ({
  TextFieldProps,
  ...fieldProps
}) => {
  return (
    <Field {...fieldProps}>
      {({ field, form }: FieldProps) => (
        <TextField
          error={
            form.touched[fieldProps.name] && !!form.errors[fieldProps.name]
          }
          {...field}
          {...TextFieldProps}
          variant="outlined"
          fullWidth
          helperText={<ErrorMessage name={fieldProps.name} />}
        />
      )}
    </Field>
  )
}

export default UIField