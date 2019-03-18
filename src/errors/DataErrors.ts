import { FormikErrors } from "formik"

export enum DataErrors {
  VALIDATION_ERROR = "DATA/VALIDATION_ERROR",
}

export class ValidationError<V> extends Error {
  public code = DataErrors.VALIDATION_ERROR
  public errors

  public constructor(message: string, errors: FormikErrors<V>) {
    super(message)
    this.errors = errors
  }
}
