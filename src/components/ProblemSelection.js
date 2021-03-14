import React from "react"
import add from "../images/plus.png"
import ModalProblemSelectionState from "../states/ModalProblemSelectionState"

export default function ProblemSelection() {
  const setModalProblemSelectionState = ModalProblemSelectionState(state => state.setVisible)

  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-full  m-5 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between">
          <div>
            <p className="inline text-center font-bold text-2xl "> Problem Selection:</p>
          </div>
          <div>
            <input className="w-9 h-9" type="image" src={add} alt="Add ActionSelection"
                   onClick={() => setModalProblemSelectionState({ visible: true })} />
          </div>
        </div>
        <div className="m-3"></div>
        <div className="w-auto h-auto">
          <p>Problem: {}</p>
          <p>Action : {}</p>
        </div>
      </div>
      <div className="mb-5"></div>
    </div>
  )

}