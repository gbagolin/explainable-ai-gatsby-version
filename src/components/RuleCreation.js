import React, { useState } from "react"
import edit from "../images/edit.png"
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

export default function RuleCreation() {
  const setVisible = ModalRuleCreationState(state => state.setVisible)
  const actionSelected = ActionManagament(state => state.actionSelected)
  const actions = ActionManagament(state => state.actionList)
  const rule = RuleState()
  const ruleSynthetized = RuleSynthetizedState()
  const editState = ModalRuleEditState()
  const editRule = RuleSelectedState()
  const ruleEditable = ButtonsName(state => state.currentState)
  const ruleReady = RuleReady()
  const buttonsName = ButtonsName()
  const isAddRuleDisabled = !(ruleReady.isProblemReady &&
    ruleReady.isTraceReady &&
    ruleReady.isActionReady)
  const resetCurrentState = ButtonsName(state => state.resetCurrentState)
  const [name, setName] = useState("Send rule")
  /**
   * returns true if there is a rule for each action
   * and the rule is complete.
   * @returns {boolean}
   */
  const isRuleReady = () => {
    console.log(rule.constraints)
    for (let i = 0; i < actions.length; i++) {
      if (!(rule.constraints[i] != undefined &&
        rule.constraints[i].length > 0)) {
        return false
      }
    }
    return (ruleReady.isRuleReady) && actions.length > 0
  }
  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-auto m-5 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="inline text-center font-bold text-2xl "> Rule creation:</p>
          </div>
          <div className="flex items-center">
            <input className="w-10 h-10 disabled:opacity-50" type="image" src={add} alt="Add ActionSelection"
                   onClick={() => setVisible({ visible: true })}
                   disabled={isAddRuleDisabled} />
            <button className="flex ml-5 font-semibold yellow-color rounded-lg p-2 disabled:opacity-50"
                    onClick={async () => {
                      setName("Rule Sent")
                      const ruleTemplate = []
                      for (let i = 0; i < actions.length; i++) {
                        const variables = new Set()
                        for (const constraints of rule.constraints[i]) {
                          for (const constraintsInAnd of constraints) {
                            variables.add(constraintsInAnd.variable)
                          }
                        }
                        const atomicRule = {
                          constraints: rule.constraints[i],
                          hard_constraint: [],
                          trace: rule.traceName,
                          problem: rule.problemName,
                          action: actions[i].name,
                          variables: [...variables]
                        }
                        ruleTemplate.push(atomicRule)
                      }
                      console.log(ruleTemplate)
                      const response = await axios.post("http://localhost:8001/api/send_rule", ruleTemplate)
                      console.log(response)
                      ruleSynthetized.setRule(response.data)
                      setName("Rule Sent")
                    }}
                    disabled={!isRuleReady()}>
              {name}
            </button>
          </div>
        </div>
        <div className="m-3"></div>
        <div>
          {
            (rule.ruleString[actionSelected] || []).map(
              (string, element) => {
                return (
                  <div className="flex justify-between mt-1"
                       key={element}>
                    <p key={element}
                    >{element + 1}. {string}</p>
                    <div className="flex justify-end">
                      <button className="rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                              onClick={() => {
                                editState.setVisible({ visible: true })
                                editRule.setRuleId(element)
                                editRule.setActionId(actionSelected)
                                editRule.setRuleString(string)
                              }}
                              disabled={ruleEditable[actionSelected] !== VIEWS.LOGIC_CONNECTOR}>✎
                      </button>
                      <button className="ml-2 rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
                              onClick={() => {
                                console.log(rule.constraints[actionSelected])
                                if (rule.constraints[actionSelected].length == 1) {
                                  buttonsName.resetButtonsHavingSpecificId(actionSelected)
                                  buttonsName.addButtons(actionSelected, rule.attributes)
                                  rule.removeConstraint(actionSelected)
                                  rule.addRule()
                                } else {
                                  rule.removeSubRule(actionSelected, element)
                                }
                              }}
                              disabled={ruleEditable[actionSelected] !== VIEWS.LOGIC_CONNECTOR}>X
                      </button>
                    </div>
                  </div>

                )
              }
            )
          }
        </div>
      </div>
      <div className="mb-5"></div>
    </div>
  )

}