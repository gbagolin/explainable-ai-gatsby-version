import React from "react"
import "./dropdown.css"
import ActionMangament from "../states/ActionState"
import RuleState from "../states/RuleState"

export default function DropdownActionChoose() {
  let actions = []
  try {
    actions = RuleState(state => state.attributes.actions)
  } catch (e) {

  }

  const actionToAdd = ActionMangament(state => state.actionToAdd)
  const setActionToAdd = ActionMangament(state => state.setActionToAdd)

  return (
    <div className="flex justify-center">
      <div className="dropdown inline-block relative">
        <button className="bg-yellow-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
          <span className="mr-1">{actionToAdd === "" ? "Select action" : actionToAdd}</span>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
        <ul className="dropdown-menu absolute hidden pt-1">
          {
            actions.map((actionString, index) => {
              return (
                <li key={index}
                    className="">
                  <button
                    className="w-full rounded-t bg-white hover:bg-yellow-200 py-2 px-4 block whitespace-no-wrap"
                    onClick={() => setActionToAdd({ actionToAdd: actionString })
                    }
                  >{actionString}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )

}