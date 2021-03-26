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
    <div className="border-2 rounded-lg shadow-lg w-auto h-auto m-5 p-5 text-lg">
      <div className="flex flex-row">
        <button className="m-5 font-semibold  yellow-color rounded-lg p-1"
                onClick={() => setWhichAnomaly(ANOMALIES.SAME_ACTION)}>Anomalies same action
        </button>
        <button className="m-5 font-semibold  yellow-color rounded-lg p-1"
                onClick={() => setWhichAnomaly(ANOMALIES.DIFFERENT_ACTION)}>Anomalies different action
        </button>
      </div>
      <div className="overflow-auto h-96">
        <table className="table-auto">
          <thead>
          <tr>
            <th className=" text-left px-8 py-4">#</th>
            <th className=" text-left px-8 py-4">Run</th>
            <th className=" text-left px-8 py-4">Action</th>
            <th className=" text-left px-8 py-4">Beliefs</th>
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
                const anomaly = element.hellinger_distance.toFixed(2) >= 0.10 ? true : false
                return (
                  <tr>
                    <td className=" text-left px-8">
                      {index + 1}
                    </td>
                    <td className=" text-left px-8 ">
                      {element.run}
                    </td>
                    <td className=" text-left px-8 ">
                      {element.action}
                    </td>
                    <td className=" text-left px-8 ">
                      {
                        element.beliefs.map((belief) => {
                          return (
                            <p>
                              {belief.state}:{belief.belief.toFixed(2)}
                            </p>
                          )
                        })
                      }
                    </td>
                    <td className=" text-left px-8 ">

                      <div className={anomaly ? "bg-red-300 rounded" : ""}>
                        {element.hellinger_distance.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                )
              }
            )
          }
          </tbody>
        </table>
      </div>
      <div className="mb-5"></div>
    </div>
  )
}