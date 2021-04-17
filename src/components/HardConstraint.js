import React, { useState } from "react"
import add from "../images/plus.png"
import ModalHardConstraintState from "../states/ModalHardConstraintState"
import HardConstraintState from "../states/HardConstraintState"

export default function HardConstraint() {
  const modalState = ModalHardConstraintState()
  const hardConstraint = HardConstraintState()
  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-auto m-1 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="inline text-center font-bold text-2xl ">
              Hard Constraint
            </p>
          </div>
          <div className="flex items-center">
            <input
              className="w-10 h-10 disabled:opacity-50"
              type="image"
              src={add}
              alt="Add ActionSelection"
              onClick={() => modalState.setVisible(true)}
              disabled={false}
            />
          </div>
        </div>
        <div className="m-3"> </div>
        {/**
         * body
         */}
        <div className="flex flex-col">
          {hardConstraint.hardConstraints.map((element, index) => {
            return (
              <p>
                {index + 1}. {element.toString()}
              </p>
            )
          })}
        </div>
      </div>
      <div className="mb-5"> </div>
    </div>
  )
}
