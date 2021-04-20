import React from "react"

export default function TraceSelector() {
  const savedResults = [{}]
  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row border-2 rounded-lg shadow-lg m-5 p-3 text-lg">
        <p>Trace result selector: </p>
        <div className="m-2"></div>
        <button className="rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center">
          1
        </button>
        <div className="m-2"></div>
        <button className="rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center">
          2
        </button>
        <div className="m-2"></div>
      </div>
    </div>
  )
}
