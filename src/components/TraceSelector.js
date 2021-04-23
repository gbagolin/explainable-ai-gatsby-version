import React from "react"
import ActionMangament from "../states/ActionState"
import ProblemState from "../states/ProblemState"
import { ResultStateCounter } from "../states/ResultStateCounter"
import { ResultStatesStore } from "../states/ResultStatesStore"
import RuleState from "../states/RuleState"
import { clonedeep } from "lodash"
import HardConstraintState from "../states/HardConstraintState"
import ButtonsName from "../states/ButtonsName"
import RuleSelectedState from "../states/RuleSelectedState"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import { RunState } from "../states/RunState"
import VariablesState from "../states/VariablesState"
import { WhichAnomaly } from "../states/WhichAnomaly"
import { CanAddResultState } from "../states/CanAddResultState"

export default function TraceSelector() {
  const savedResults = ResultStatesStore()
  const resultsCounter = ResultStateCounter()
  const actionState = ActionMangament()
  const ruleState = RuleState()
  const problemState = ProblemState()
  const buttonsName = ButtonsName()
  const hardConstraint = HardConstraintState()
  const ruleSelected = RuleSelectedState()
  const ruleSynthetizedState = RuleSynthetizedState()
  const runState = RunState()
  const variableState = VariablesState()
  const whichAnomaly = WhichAnomaly()
  const canAddResultState = CanAddResultState()
  const dummyVar = () => {
    const arr = []
    for (let i = 0; i < resultsCounter.counter; i++) arr.push(i)
    return arr
  }

  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row border-2 rounded-lg shadow-lg m-5 p-3 text-lg">
        <p>Result selector: </p>
        <div className="m-2"></div>
        <button
          className={
            "rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center text-lg disabled:opacity-50"
          }
          onClick={() => {
            resultsCounter.increment()
            resultsCounter.setSelected(resultsCounter.counter)
            const problemStateClone = clonedeep(problemState)
            const actionStateClone = clonedeep(actionState)
            const buttonsNameClone = clonedeep(buttonsName)
            const hardConstraintClone = clonedeep(hardConstraint)
            const ruleSelectedClone = clonedeep(ruleSelected)
            const ruleStateClone = clonedeep(ruleState)
            const ruleSynthetizedClone = clonedeep(ruleSynthetizedState)
            const runStateClone = clonedeep(runState)
            const variableStateClone = clonedeep(variableState)
            const whichAnomalyClone = clonedeep(whichAnomaly)
            savedResults.setResultStore({
              id: resultsCounter.counter,
              problemState: problemStateClone,
              actionState: actionStateClone,
              buttonsName: buttonsNameClone,
              hardConstraint: hardConstraintClone,
              ruleSelected: ruleSelectedClone,
              ruleState: ruleStateClone,
              ruleSynthetizedState: ruleSynthetizedClone,
              runState: runStateClone,
              variableState: variableStateClone,
              whichAnomaly: whichAnomalyClone,
            })
          }}
          disabled={!canAddResultState.bool}
        >
          +
        </button>
        <div className="m-2"></div>
        {dummyVar().map((v, index) => {
          const selectedClass =
            resultsCounter.selected === index
              ? "rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
              : "rounded-full bg-yellow-100 h-8 w-8 flex items-center justify-center"
          return (
            <>
              <button
                className={selectedClass}
                onClick={() => {
                  resultsCounter.setSelected(index)
                  const storedProblemState = savedResults.problemState.get(
                    index
                  )
                  const storedActionState = savedResults.actionState.get(index)
                  const storedButtonsName = savedResults.buttonsName.get(index)
                  const storedHardConstraint = savedResults.hardConstraint.get(
                    index
                  )
                  const storedRuleSelected = savedResults.ruleSelected.get(
                    index
                  )
                  const storedRuleState = savedResults.ruleState.get(index)
                  const storedRuleSynthetizedState = savedResults.ruleSynthetizedState.get(
                    index
                  )
                  const storedRunState = savedResults.runState.get(index)
                  const storedVariableState = savedResults.variableState.get(
                    index
                  )
                  const storedWhichAnomaly = savedResults.whichAnomaly.get(
                    index
                  )
                  problemState.setStore(storedProblemState)
                  actionState.setStore(storedActionState)
                  buttonsName.setStore(storedButtonsName)
                  hardConstraint.setStore(storedHardConstraint)
                  ruleSelected.setStore(storedRuleSelected)
                  ruleState.setStore(storedRuleState)
                  ruleSynthetizedState.setStore(storedRuleSynthetizedState)
                  runState.setStore(storedRunState)
                  variableState.setStore(storedVariableState)
                  whichAnomaly.setStore(storedWhichAnomaly)
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
