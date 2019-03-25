import { Action, Reducer } from "redux"

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreUIActionTypes {
  OpenSnackbar = "ui/open_snackbar",
  CloseSnackbar = "ui/close_snackbar",
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------
interface StoreUIOpenSnackbarAction
  extends Action<StoreUIActionTypes.OpenSnackbar> {
  message: string
}
function openSnackbar(message: string): StoreUIOpenSnackbarAction {
  return {
    type: StoreUIActionTypes.OpenSnackbar,
    message,
  }
}

interface StoreUICloseSnackbarAction
  extends Action<StoreUIActionTypes.CloseSnackbar> {}
function closeSnackbar(): StoreUICloseSnackbarAction {
  return {
    type: StoreUIActionTypes.CloseSnackbar,
  }
}

export const StoreUIActionCreators = {
  openSnackbar,
  closeSnackbar,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
const StoreUIDefaultState: StoreUIState = {
  snackbar: {
    open: false,
    message: "",
  },
}

interface StoreUISnackbarState {
  open: boolean
  message: string
}

export interface StoreUIState {
  snackbar: StoreUISnackbarState
}

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const StoreUIReducer: Reducer<
  StoreUIState,
  StoreUIOpenSnackbarAction | StoreUICloseSnackbarAction
> = (state = StoreUIDefaultState, action) => {
  switch (action.type) {
    case StoreUIActionTypes.OpenSnackbar:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message,
        },
      }
    case StoreUIActionTypes.CloseSnackbar:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      }
    default:
      return state
  }
}

export default StoreUIReducer
