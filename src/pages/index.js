import React from "react"
import ActionSelection from "../components/ActionSelection"
import RuleCreation from "../components/RuleCreation"
import RuleSynthetized from "../components/RuleSynthetized"
import Anomalies from "../components/Anomalies"
import ModalAddAction from "../components/ModalAddAction"
import ProblemSelection from "../components/ProblemSelection"
import ModalProblemSelection from "../components/ModalProblemSelection"
import ModalRuleCreation from "../components/ModalRuleCreation"
import Plot from "../components/Plot"
import ModalRuleEdit from "../components/ModalRuleEdit"
import VariableDeclaration from "../components/VariableDeclaration"
import ModalVariableDeclaration from "../components/ModalVariableDeclaration"
import HardConstraint from "../components/HardConstraint"
import ModalHardConstraint from "../components/ModalHardConstraint"
import TraceSelector from "../components/TraceSelector"
import { ResultStatesStore } from "../states/ResultStatesStore"
import { ResultStateCounter } from "../states/ResultStateCounter"
import RuleState from "../states/RuleState"
import ProblemState from "../states/ProblemState"
import ActionMangament from "../states/ActionState"
import { clonedeep } from "lodash"

export default function Home() {
  const resultStore = ResultStatesStore()
  const resultCounter = ResultStateCounter()
  const problemState = ProblemState()
  const actionState = ActionMangament()
  return (
    <>
      <p className="text-center font-bold text-5xl underline text-color-yellow">
        Explainable POMCP
      </p>
      <div className="flex flex-wrap justify-start 2xl:justify-around flex-row">
        <div className="flex flex-col flex-shrink m-5">
          <ProblemSelection></ProblemSelection>
          <button
            onClick={() => {
              const actionStateClone = clonedeep(actionState)
              resultStore.setResultStore({
                id: resultCounter.counter,
                problemState: problemState,
                actionState: actionStateClone,
                // buttonsName: buttonsName,
                // hardConstraint: hardConstraint,
                // ruleSelected: ruleSelected,
                // ruleState: rule,
                // ruleSynthetizedState: ruleSynthetized,
                // runState: runState,
                // variableState: variableState,
                // whichAnomaly: whichAnomaly,
              })
              resultCounter.increment()
            }}
          >
            Save problem
          </button>
          <ActionSelection></ActionSelection>
          <VariableDeclaration></VariableDeclaration>
          <RuleCreation></RuleCreation>
          <HardConstraint></HardConstraint>
        </div>
        <div className="flex flex-col flex-shrink">
          <TraceSelector></TraceSelector>
          <RuleSynthetized></RuleSynthetized>
          <Plot></Plot>
        </div>
        <div className="flex flex-col flex-shrink">
          <Anomalies></Anomalies>
        </div>
        <ModalProblemSelection></ModalProblemSelection>
        <ModalAddAction></ModalAddAction>
        <ModalRuleCreation></ModalRuleCreation>
        <ModalRuleEdit></ModalRuleEdit>
        <ModalVariableDeclaration></ModalVariableDeclaration>
        <ModalHardConstraint></ModalHardConstraint>
      </div>
    </>
  )
}
