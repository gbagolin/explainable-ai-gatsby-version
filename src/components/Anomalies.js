import React, { useState } from "react"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import { WhichAnomaly } from "../states/WhichAnomaly"
import { ANOMALIES } from "../util/ANOMALIES_TYPE"
import ActionMangament from "../states/ActionState"
import { RUN_TYPES, RunState } from "../states/RunState"
import NodePressed from "../states/NodePressed"
import KeepAnomaliesOnGraph from "../states/KeepAnomaliesOnGraph"
import GraphInstance from "../states/GraphInstance"

export default function Anomalies() {
  const rule = RuleSynthetizedState(state => state.rule)
  const anomalyTypeState = WhichAnomaly()
  const actionSelected = ActionMangament(state => state.actionSelected)
  const runState = RunState()
  const [severityValue, setSeverity] = useState(0)

  const nodePressed = NodePressed()

  const keepAnomaliesSameGraph = KeepAnomaliesOnGraph()
  /**
   * An instance of the Cytoscape graph
   * @type {{setGraph: function(*=): *, graph: *}}
   */
  const graphInstance = GraphInstance()

  const anomalyClassSameAction =
    anomalyTypeState.type === ANOMALIES.SAME_ACTION
      ? "m-5 font-semibold  yellow-color rounded-lg p-3"
      : "m-5 font-semibold  bg-yellow-100 rounded-lg p-3"
  const anomalyClassDifferentAction =
    anomalyTypeState.type === ANOMALIES.DIFFERENT_ACTION
      ? "m-5 font-semibold  yellow-color rounded-lg p-3"
      : "m-5 font-semibold  bg-yellow-100 rounded-lg p-3"

  const sameGraphButtonStyle = keepAnomaliesSameGraph.keepAnomaliesOnGraph ?
    "m-5 font-semibold  yellow-color rounded-lg p-3" :
    "m-5 font-semibold  bg-yellow-100 rounded-lg p-3"

  const getAnomaliesByActionId = (anomalies, id) => {
    if (anomalies === undefined) return []
    for (const anomalyObject of anomalies) {
      if (anomalyObject.actions === undefined) return []
      if (anomalyObject.actions.id == id) {
        return anomalyObject.anomalies
      }
    }
    return []
  }

  const anomalies = getAnomaliesByActionId(
    rule[anomalyTypeState.type],
    actionSelected
  )

  const anomaliesSameAction = getAnomaliesByActionId(
    rule[ANOMALIES.SAME_ACTION],
    actionSelected
  )

  function drawAllAnomaliesOnGraph() {
    console.log("Anomalies same action: ", anomaliesSameAction)
    const anomaliesWithHellLessEqual = anomaliesSameAction.filter(anomaly => anomaly.hellinger_distance >= severityValue)
    console.log("Anomalies to display: ", anomaliesWithHellLessEqual)

    if(!keepAnomaliesSameGraph.keepAnomaliesOnGraph){
      keepAnomaliesSameGraph.changeToOpposite()
    }
    const cy = graphInstance.graph
    cy.nodes().style("background-color", "white")
    cy.edges().style("line-color", "black")
    cy.edges().style("label", "")
    for(const anomaly of anomaliesWithHellLessEqual){
      cy.nodes()[anomaly.step - 1].style("background-color", "red")
    }

  }

  const anomaliesLength = anomalies != undefined ? anomalies.length : 0

  return (
    <div className="border-2 rounded-lg shadow-lg w-auto h-auto m-5 p-3 text-lg">
      <div class="">
        <div className="">
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

          <button className={sameGraphButtonStyle} onClick={() => {
            keepAnomaliesSameGraph.changeToOpposite()
          }}>Same Graph
          </button>

        </div>
        <div className=" overflow-y-auto items-start h-96">
          <table className="table-auto text-left">
            <thead>
            <tr className="">
              <th className="p-3 w-50"> # : ({anomaliesLength})</th>
              <th className="p-3 w-50"> Run</th>
              <th className="p-3 w-50"> Step</th>
              <th className="p-3 w-50"> Action</th>
              <th className="p-3 w-50"> Beliefs</th>
              <th className="p-3 w-50">
                <div className="flex flex-col items-start">
                  <div className="">Severity: {severityValue} </div>
                  <div>
                    <input
                      className="rounded-lg overflow-hidden appearance-none bg-yellow-300 h-3 w-16"
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.01"
                      onChange={e => {
                        setSeverity(e.target.value)
                        drawAllAnomaliesOnGraph()
                      }}
                    ></input>
                  </div>
                </div>
              </th>
            </tr>
            </thead>
            <tbody>
            {anomalies.map((element, index) => {
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
                runState.run === element ? "rounded-lg bg-yellow-100" : ""

              return (
                <tr className={background} key={index}>
                  <td className="p-3 w-50"> {index + 1} </td>
                  <td className="p-3 w-50">
                    <button
                      className="underline text-color-yellow"
                      onClick={() => {
                        console.log(element)
                        runState.setRun(element)
                      }}
                    >
                      {element.run}
                    </button>
                  </td>
                  <td className="p-3 w-50"> {element.step} </td>
                  <td className="p-3 w-50"> {element.action} </td>
                  <td className="p-3 w-50">
                    {element.beliefs.map((belief, key) => {
                      return (
                        <p key={key}>
                          {belief.state}: {belief.belief.toFixed(2)}
                        </p>
                      )
                    })}
                  </td>
                  <td className="p-3 w-50">
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
      </div>
      <div className="mb-5"></div>
    </div>
  )
}
