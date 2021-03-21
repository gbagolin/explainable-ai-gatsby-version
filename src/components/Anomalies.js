import React from "react"
import add from "../images/plus.png"

export default function Anomalies() {
  return (
    <div className="border-2 rounded-lg shadow-lg w-96 h-full m-5 p-5 text-lg">
      <div className="flex flex-col flex-initial justify-items-start">
        <div className="flex flex-row justify-between">
          <div>
            <p className="inline text-center font-bold text-2xl "> Anomalies:</p>
          </div>
          <div>
            <input className="w-9 h-9" type="image" src={add} alt="Add ActionSelection" />
          </div>
        </div>
        <div className="m-3"></div>
        <div className="w-auto h-auto">
          <button className="font-semibold  yellow-color rounded-lg p-3"> ActionS election: Listen</button>
        </div>
        <div className="w-auto h-auto mt-5">
          <button className="font-semibold  yellow-color rounded-lg p-3"> Action Selection: Open left</button>
        </div>
      </div>
      <div className="mb-5"></div>
    </div>

  )
}