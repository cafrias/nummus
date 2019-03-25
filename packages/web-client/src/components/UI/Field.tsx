import * as React from "react"

import { Field, FieldProps, ErrorMessage } from "formik"

import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"

import { makeStyles, createStyles } from "@material-ui/styles"

const useStyles = makeStyles(() =>
  createStyles({
    errorMessage: {
      marginLeft: "0.5rem",
    },
  })
)

export interface UIFieldProps {
  validate?: (v: string) => string
  name: string
  TextFieldProps: TextFieldProps
}

const UIField: React.SFC<UIFieldProps> = ({
  TextFieldProps,
  ...fieldProps
}) => {
  const classes = useStyles()

  return (
    <Field {...fieldProps}>
      {({ field, form }: FieldProps) => (
        <>
          <TextField
            error={
              form.touched[fieldProps.name] && !!form.errors[fieldProps.name]
            }
            {...field}
            {...TextFieldProps}
            // We use native selects to prevent bug in automatic testing using `react-testing-library`
            SelectProps={TextFieldProps.select ? { native: true } : undefined}
            variant="outlined"
            fullWidth
          />
          <Typography
            className={classes.errorMessage}
            variant="body2"
            color="error"
          >
            <ErrorMessage name={fieldProps.name} />
          </Typography>
        </>
      )}
    </Field>
  )
}

export default UIField
