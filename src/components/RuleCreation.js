import React from "react"
import add from "../images/plus.png"
import ModalRuleCreationState from "../states/ModalRuleCreationState"
import RuleState from "../states/RuleState"
import ActionManagament from "../states/ActionState"
import axios from "axios"
import ButtonsName from "../states/ButtonsName"

export default function RuleCreation() {
  const setVisible = ModalRuleCreationState(state => state.setVisible)
  const actionSelected = ActionManagament(state => state.actionSelected)
  const actions = ActionManagament(state => state.actionList)
  const rule = RuleState()
  const variables = ButtonsName(state => state.variables)

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-full  m-5 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="inline text-center font-bold text-2xl "> Rule creation:</p>
          </div>
          <div className="flex items-center">
            <input className="w-10 h-10" type="image" src={add} alt="Add ActionSelection"
                   onClick={() => setVisible({ visible: true })} />
            <button className="ml-5 font-semibold  yellow-color rounded-lg p-2"
                    onClick={() => {
                      const ruleTemplate = []
                      for (let i = 0; i < actions.length; i++) {
                        const atomicRule = {
                          constraints: rule.constraints[i],
                          hard_constraint: [],
                          trace: rule.traceName,
                          problem: rule.problemName,
                          action: actions[i].name,
                          variables: variables[i].map((e) => e.id).slice(0, variables[i].length - 1)
                        }
                        ruleTemplate.push(atomicRule)
                      }
                      console.log(ruleTemplate)
                      axios.post("http://localhost:8001/api/send_rule", ruleTemplate)
                    }}>Send Rule
            </button>
          </div>
        </div>
        <div className="m-3"></div>
        <div>
          {
            (rule.ruleString[actionSelected] || []).map(
              (string, element) => {
                return (
                  <p key={element}>{element + 1}. {string}</p>
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