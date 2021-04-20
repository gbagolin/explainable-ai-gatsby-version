import React, { useState } from "react"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import { WhichAnomaly } from "../states/WhichAnomaly"
import { ANOMALIES } from "../util/ANOMALIES_TYPE"
import ActionMangament from "../states/ActionState"
import { RUN_TYPES, RunState } from "../states/RunState"

export default function Anomalies() {
  const rule = RuleSynthetizedState(state => state.rule)
  const anomalyTypeState = WhichAnomaly()
  const actionSelected = ActionMangament(state => state.actionSelected)
  const runState = RunState()
  const [severityValue, setSeverity] = useState(0)
  const anomalyClassSameAction =
    anomalyTypeState.type === ANOMALIES.SAME_ACTION
      ? "m-5 font-semibold  yellow-color rounded-lg p-3"
      : "m-5 font-semibold  bg-yellow-200 rounded-lg p-3"
  const anomalyClassDifferentAction =
    anomalyTypeState.type === ANOMALIES.DIFFERENT_ACTION
      ? "m-5 font-semibold  yellow-color rounded-lg p-3"
      : "m-5 font-semibold  bg-yellow-200 rounded-lg p-3"
  const anomaliesArray =
    ((rule[anomalyTypeState.type] || [])[actionSelected] || []).anomalies || []
  const anomaliesLength = anomaliesArray.length
  return (
    <div className="border-2 rounded-lg shadow-lg w-auto h-auto m-5 p-3 text-lg">
      <div className="flex flex-row">
        <button
          className={anomalyClassSameAction}
          onClick={() => {
            anomalyTypeState.setType(ANOMALIES.SAME_ACTION)
            runState.setRun(undefined)
          }}
        >
          Anomalies same action
        </button>
        <button
          className={anomalyClassDifferentAction}
          onClick={() => {
            anomalyTypeState.setType(ANOMALIES.DIFFERENT_ACTION)
            runState.setRun(undefined)
          }}
        >
          Anomalies different action
        </button>
      </div>
      <div className="flex overflow-auto h-96">
        <table className="table-auto text-left">
          <thead>
            <tr>
              <th className="p-3"> # : ({anomaliesArray.length}) </th>{" "}
              <th className="p-3"> Run </th>
              <th className="p-3"> Step </th> <th className="p-3"> Action </th>
              <th className="p-3"> Beliefs </th>
              <th className="p-3">
                <div className="flex flex-col items-start">
                  <div className="w-32">Severity: {severityValue} </div>
                  <div>
                    <input
                      className="rounded-lg overflow-hidden appearance-none bg-yellow-300 h-3 w-16"
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      onChange={e => setSeverity(e.target.value)}
                    ></input>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {anomaliesArray.map((element, index) => {
              let anomaly = false
              if (element.hellinger_distance != undefined)
                anomaly =
                  element.hellinger_distance.toFixed(2) >= severityValue
                    ? true
                    : false
              const severity =
                element.hellinger_distance != undefined
                  ? element.hellinger_distance
                  : undefined
              const background =
                runState.run === element ? "rounded-lg bg-yellow-200" : ""

              return (
                <tr className={background}>
                  <td className="p-3"> {index + 1} </td>
                  <td className="p-3">
                    <button
                      className="underline text-color-yellow"
                      onClick={() => runState.setRun(element)}
                    >
                      {element.run}
                    </button>
                  </td>
                  <td className="p-3"> {element.step} </td>
                  <td className="p-3"> {element.action} </td>
                  <td className="p-3">
                    {element.beliefs.map(belief => {
                      return (
                        <p>
                          {belief.state}: {belief.belief.toFixed(2)}
                        </p>
                      )
                    })}
                  </td>
                  <td className="p-3">
                    <div className={anomaly ? "bg-red-300 rounded" : ""}>
                      <p className="text-center">
                        {severity === undefined ? "" : severity.toFixed(2)}
                      </p>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="mb-5"> </div>
    </div>
  )
}
