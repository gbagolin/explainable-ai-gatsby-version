import React from "react"
import ActionMangament from "../states/ActionState"
import ProblemState from "../states/ProblemState"
import { ResultStateCounter } from "../states/ResultStateCounter"
import { ResultStatesStore } from "../states/ResultStatesStore"
import RuleState from "../states/RuleState"

export default function TraceSelector() {
  const savedResults = ResultStatesStore()
  const resultsCounter = ResultStateCounter().counter
  const actionState = ActionMangament()
  const ruleStateOriginal = RuleState()
  const problemState = ProblemState()

  const dummyVar = () => {
    const arr = []
    for (let i = 0; i < resultsCounter; i++) arr.push(i)
    return arr
  }

  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row border-2 rounded-lg shadow-lg m-5 p-3 text-lg">
        <p>Trace result selector: </p>
        <div className="m-2"></div>
        {dummyVar().map((v, index) => {
          return (
            <>
              <button
                className="rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                onClick={() => {
                  const storedProblemState = savedResults.problemState.get(
                    index
                  )
                  const storedActionState = savedResults.actionState.get(index)
                  console.log("Problem State: ", storedProblemState)
                  console.log("Action State: ", storedActionState)
                  problemState.setStore(storedProblemState)
                  actionState.setStore(storedActionState)
                }}
                key={index}
              >
                {index + 1}
              </button>
              <div className="m-2"></div>
            </>
          )
        })}
      </div>
    </div>
  )
}
