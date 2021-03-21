import React from "react"
import add from "../images/plus.png"
import ModalActionSelectionState from "../states/ModalActionSelectionState"
import ActionMangament from "../states/ActionState"

export default function ActionSelection() {
  const setModalActionVisible = ModalActionSelectionState(state => state.setVisible)
  const actions = ActionMangament(state => state.actionList)
  const setActionSelected = ActionMangament(state => state.setActionSelected)
  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-full m-5 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between">
          <div>
            <p className="inline text-center font-bold text-2xl "> Action Selections:</p>
          </div>
          <div>
            <input className="w-9 h-9" type="image" src={add} alt="Add ActionSelection"
              onClick={() => setModalActionVisible({ visible: true })} />
          </div>
        </div>
        <div className="m-3"></div>
        {
          actions.map((action, index) => {
            return (
              <div key={index}>
                <div
                  key={index}
                  className="w-auto h-auto">
                  <button
                    className="font-semibold  yellow-color rounded-lg p-3"
                    onClick={() => {
                      setActionSelected({ actionSelected: action.id })
                      console.log("Clicking action with id: %i", action.id)
                    }
                    }>{action.name}</button>
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