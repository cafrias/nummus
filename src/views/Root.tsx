import * as React from "react"

import BudgetViews from "./Budget"

export interface RootProps {}

const Root: React.SFC<RootProps> = props => {
  return <BudgetViews.Create />
}

export default Root
