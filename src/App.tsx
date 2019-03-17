import * as React from "react"

import Button from "~/components/Button"

export interface AppProps {}

const App: React.SFC<AppProps> = props => {
  return (
    <>
      <h1>I'm the cool nummus app</h1>
      <Button />
    </>
  )
}

export default App
