import React, { useState } from "react"
import add from "../images/plus.png"
import ModalRuleCreationState from "../states/ModalRuleCreationState"
import RuleState from "../states/RuleState"
import ActionManagament from "../states/ActionState"
import axios from "axios"
import ButtonsName from "../states/ButtonsName"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import ModalRuleEditState from "../states/ModalRuleEditState"
import RuleSelectedState from "../states/RuleSelectedState"
import VIEWS from "../util/VIEWS"
import RuleReady from "../states/RuleReady"
import HardConstraintState from "../states/HardConstraintState"
import { ResultStateCounter } from "../states/ResultStateCounter"
import { ResultStatesStore } from "../states/ResultStatesStore"
import { RunState } from "../states/RunState"
import VariablesState from "../states/VariablesState"
import { WhichAnomaly } from "../states/WhichAnomaly"
import ProblemState from "../states/ProblemState"

export default function RuleCreation() {
  const setVisible = ModalRuleCreationState(state => state.setVisible)
  const actionSelected = ActionManagament(state => state.actionSelected)
  const rule = RuleState()
  const ruleSynthetized = RuleSynthetizedState()
  const editState = ModalRuleEditState()
  const editRule = RuleSelectedState()
  const ruleEditable = ButtonsName(state => state.currentState)
  const ruleReady = RuleReady()
  const buttonsName = ButtonsName()
  const isAddRuleDisabled = !(
    ruleReady.isProblemReady &&
    ruleReady.isTraceReady &&
    ruleReady.isActionReady
  )
  const resetCurrentState = ButtonsName(state => state.resetCurrentState)
  const [name, setName] = useState("Send rule")
  const hardConstraint = HardConstraintState()
  const resultCounter = ResultStateCounter()
  const resultStore = ResultStatesStore()
  const actionState = ActionManagament()
  const ruleSelected = editRule
  const runState = RunState()
  const variableState = VariablesState()
  const whichAnomaly = WhichAnomaly()
  const problemState = ProblemState()

  const ruleString = () => {
    try {
      return rule.ruleString.get(actionSelected).keys()
    } catch (e) {
      return []
    }
  }

  /**
   * returns true if there is a rule for each action
   * and the rule is complete.
   * @returns {boolean}
   */
  const isRuleReady = () => {
    console.log(rule.constraints)
    for (const key of actionState.actions.keys()) {
      if (
        !(
          rule.constraints.get(key) != undefined &&
          rule.constraints.get(key).size > 0
        )
      ) {
        return false
      }
    }
    return ruleReady.isRuleReady && actionState.actions.size > 0
  }

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-auto mt-2 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="inline text-center font-bold text-2xl ">
              {" "}
              Rule creation:
            </p>
          </div>
          <div className="flex items-center">
            <input
              className="w-10 h-10 disabled:opacity-50"
              type="image"
              src={add}
              alt="Add ActionSelection"
              onClick={() => setVisible({ visible: true })}
              disabled={isAddRuleDisabled}
            />
            <button
              className="flex ml-5 font-semibold yellow-color rounded-lg p-2 disabled:opacity-50"
              onClick={async () => {
                setName("Rule Sent")
                const ruleTemplate = []
                let i = 0
                for (const key of actionState.actions.keys()) {
                  const variables = new Set()
                  for (const constraints of rule.constraints
                    .get(key)
                    .values()) {
                    for (const constraintsInAnd of constraints) {
                      variables.add(constraintsInAnd.variable)
                    }
                  }
                  const atomicRule = {
                    constraints: [...rule.constraints.get(key).values()],
                    hard_constraint: [],
                    trace: problemState.trace,
                    problem: problemState.problem,
                    action: actionState.actions.get(key),
                    variables: [...variables],
                  }
                  ruleTemplate.push(atomicRule)
                  i += 1
                }
                const data = {
                  hardConstraint: hardConstraint.hardConstraints,
                  ruleTemplate: ruleTemplate,
                }
                console.log("Data to send:", data)
                console.log(ruleTemplate)
                const response = await axios.post(
                  "http://localhost:8001/api/send_rule",
                  data
                )
                const resultId = resultCounter.counter
                console.log("resultid: ", resultId)
                console.log("Action State:", actionState)
                
                resultStore.setResultStore({
                  id: resultId,
                  actionState: actionState,
                  buttonsName: buttonsName,
                  hardConstraint: hardConstraint,
                  ruleSelected: ruleSelected,
                  ruleState: rule,
                  ruleSynthetizedState: ruleSynthetized,
                  runState: runState,
                  variableState: variableState,
                  whichAnomaly: whichAnomaly,
                })
                resultCounter.increment()
                console.log(response)
                ruleSynthetized.setRule(response.data)
                setName("Rule Sent")
              }}
              disabled={!isRuleReady()}
            >
              {name}
            </button>
          </div>
        </div>
        <div className="m-3"></div>
        <div>
          {[...ruleString()].map((key, index) => {
            return (
              <div className="flex justify-between mt-1" key={key}>
                <p key={index}>
                  {index + 1}. {rule.ruleString.get(actionSelected).get(key)}
                </p>
                <div className="flex justify-end">
                  <button
                    className="rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                    onClick={() => {
                      editState.setVisible({ visible: true })
                      editRule.setRuleId(index)
                      editRule.setActionId(actionSelected)
                      editRule.setRuleString(ruleString.get(key))
                    }}
                    disabled={
                      ruleEditable[actionSelected] !== VIEWS.LOGIC_CONNECTOR
                    }
                  >
                    ✎
                  </button>
                  <button
                    className="ml-2 rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                    onClick={() => {
                      if (rule.constraints.get(actionSelected).size === 1) {
                        buttonsName.resetButtonsHavingSpecificId(actionSelected)
                        buttonsName.addButtons(
                          actionSelected,
                          problemState.attributes
                        )
                        rule.removeConstraint(actionSelected)
                        rule.addRule(actionSelected)
                      } else {
                        rule.removeSubRule(actionSelected, key)
                      }
                    }}
                    disabled={
                      ruleEditable[actionSelected] !== VIEWS.LOGIC_CONNECTOR
                    }
                  >
                    X
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mb-5"></div>
    </div>
  )
}
