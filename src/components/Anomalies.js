import React from "react"
import add from "../images/plus.png"
import RuleSynthetizedState from "../states/RuleSynthetizedState"

export default function Anomalies() {
  const rule = RuleSynthetizedState(state => state.rule)
  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-full m-5 p-5 text-lg">

      <table className="table-auto">
        <thead>
        <tr>
          <th>#</th>
          <th>Run</th>
          <th>Action</th>
          <th>Beliefs</th>
          <th>
            <div>
              Severity
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <div className="mb-5"></div>
    </div>
  )
}