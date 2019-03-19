import * as React from "react"
import { render, cleanup } from "react-testing-library"

import "jest-dom/extend-expect"

import BudgetCreate from "./Create"

afterEach(cleanup)

describe("Budget create view", () => {
  it("renders successfully", async () => {
    const wrapper = render(<BudgetCreate />)
    wrapper.getByText("Create")
  })
})
