import * as React from "react"

import {
  Form,
  Formik,
  FormikErrors,
  Field,
  FieldProps,
  FormikProps,
} from "formik"

import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import UIField from "~/components/UI/Field"
import { CreateFormProps } from "~/components/UI/Forms/Create"

import classNames from "classnames"

import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import InputAdornment from "@material-ui/core/InputAdornment"
import green from "@material-ui/core/colors/green"
import deepOrange from "@material-ui/core/colors/deepOrange"

import Icon from "@material-ui/core/Icon"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"

import { makeStyles, createStyles } from "@material-ui/styles"
import { IdName } from "~/types/IdLabel"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface RecordFormsCreateValues {
  amount: number
  account: string
}
