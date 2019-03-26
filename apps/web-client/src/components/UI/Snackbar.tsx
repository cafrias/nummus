import * as React from "react"

// Redux
import { connect } from "react-redux"
import { StoreState } from "~/store"
import { StoreUIActionCreators } from "~/store/ui"

// MUI
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface UISnackbarProps extends StateProps, DispatchProps {}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const UISnackbar: React.SFC<UISnackbarProps> = props => {
  return (
    <Snackbar
      open={props.open}
      message={props.message}
      autoHideDuration={3500}
      onClose={props.close}
      action={
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={props.close}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
interface StateProps {
  open: boolean
  message: string
}

interface DispatchProps {
  close: () => void
}

export default connect<StateProps, DispatchProps, {}, StoreState>(
  state => ({
    ...state.ui.snackbar,
  }),
  {
    close: StoreUIActionCreators.closeSnackbar,
  }
)(UISnackbar)
