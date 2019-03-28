import * as React from "react"

import { ViewProps } from "../Root"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const Budgets: React.SFC<ViewProps> = props => {
  return <>{props.children}</>
}

export default Budgets
