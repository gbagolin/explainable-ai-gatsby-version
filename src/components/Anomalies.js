import React, { useState } from "react"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import ActionMangament from "../states/ActionState"


const ANOMALIES = {
  "SAME_ACTION": "anomalies_same_action",
  "DIFFERENT_ACTION": "anomalies_different_action"
}

export default function Anomalies() {
  const rule = RuleSynthetizedState(state => state.rule)
  const [whichAnomaly, setWhichAnomaly] = useState(ANOMALIES.SAME_ACTION)
  const actionSelected = ActionMangament(state => state.actionSelected)

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-full m-5 p-5 text-lg">
      <div className="flex flex-row">
        <button className="m-5 font-semibold  yellow-color rounded-lg p-1"
                onClick={() => setWhichAnomaly(ANOMALIES.SAME_ACTION)}>Anomalies same action
        </button>
        <button className="m-5 font-semibold  yellow-color rounded-lg p-1"
                onClick={() => setWhichAnomaly(ANOMALIES.DIFFERENT_ACTION)}>Anomalies different action
        </button>
      </div>
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
        {
          ((((rule[whichAnomaly] || [])[actionSelected]) || []).anomalies || []).map(
            (element, index) => {
              return (
                <tr>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {element.run}
                  </td>
                  <td>
                    {element.action}
                  </td>
                  <td>
                    {
                      element.beliefs.map((belief) => {
                        return (
                          <p>
                            {belief.state}:{belief.belief}
                          </p>
                        )
                      })
                    }
                  </td>
                </tr>
              )
            }
          )
        }
        </tbody>
      </table>
      <div className="mb-5"></div>
    </div>
  )
}