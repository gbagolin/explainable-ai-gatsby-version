import React from "react"
import bearManagament from "./bearManagement"

export default function Action() {
  const bears = bearManagament(state => state.bears)
  return <h1>{bears} around here ...</h1>
}