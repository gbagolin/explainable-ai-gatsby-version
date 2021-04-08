import React from "react"
import add from "../images/plus.png"
import ModalActionSelectionState from "../states/ModalActionSelectionState"
import ActionMangament from "../states/ActionState"
import RuleReady from "../states/RuleReady"

export default function ActionSelection() {
  const setModalActionVisible = ModalActionSelectionState(state => state.setVisible)
  const actions = ActionMangament(state => state.actionList)
  const setActionSelected = ActionMangament(state => state.setActionSelected)
  const ruleReady = RuleReady()
  const isDisabled = !(ruleReady.isProblemReady && ruleReady.isTraceReady)
  const actionSelected = ActionMangament(state => state.actionSelected)

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 m-5 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between">
          <div>
            <p className="inline text-center font-bold text-2xl "> Action Selections:</p>
          </div>
          <div>
            <input className="w-9 h-9 disabled:opacity-50" type="image" src={add} alt="Add ActionSelection"
                   onClick={() => setModalActionVisible({ visible: true })}
                   disabled={isDisabled} />
          </div>
        </div>
        <div className="m-3"></div>
        {
          actions.map((action, index) => {
            const style = actionSelected === index ? "font-semibold rounded-lg p-3 yellow-color" :
              "font-semibold rounded-lg p-3 bg-yellow-100"
            return (
              <div key={index}>
                <div
                  key={index}
                  className="w-auto h-auto">
                  <button
                    className={style}
                    onClick={() => {
                      setActionSelected({ actionSelected: action.id })
                      console.log("Clicking action with id: %i", action.id)
                    }
                    }
                  >{action.name}</button>
                </div>
                <div key={"second div" + index}
                     className="mt-3"></div>
              </div>
            )
          })
        }
      </div>
      <div className="mb-5"></div>
    </div>
  )
}