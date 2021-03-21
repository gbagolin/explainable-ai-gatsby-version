import React, { useEffect, useState } from "react"
import add from "../images/plus.png"
import ModalRuleCreationState from "../states/ModalRuleCreationState"
import RuleState from "../states/RuleState"
import ActionManagament from '../states/ActionState'

export default function RuleCreation() {
  const setVisible = ModalRuleCreationState(state => state.setVisible)
  const actionSelected = ActionManagament(state => state.actionSelected)
  let rule = RuleState(state => state.ruleString)

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-full  m-5 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between">
          <div>
            <p className="inline text-center font-bold text-2xl "> Rule creation:</p>
          </div>
          <div>
            <input className="w-9 h-9" type="image" src={add} alt="Add ActionSelection"
              onClick={() => setVisible({ visible: true })} />
          </div>
        </div>
        <div className="m-3"></div>
        <div>
          {
            (rule[actionSelected] || []).map(
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