import React from "react"
import ActionMangament from "../states/ActionState"
import ProblemState from "../states/ProblemState"
import { ResultStateCounter } from "../states/ResultStateCounter"
import { ResultStatesStore } from "../states/ResultStatesStore"
import RuleState from "../states/RuleState"
import { clonedeep, entries } from "lodash"
import HardConstraintState from "../states/HardConstraintState"
import ButtonsName from "../states/ButtonsName"
import RuleSelectedState from "../states/RuleSelectedState"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import { RunState } from "../states/RunState"
import VariablesState from "../states/VariablesState"
import { WhichAnomaly } from "../states/WhichAnomaly"
import { CanAddResultState } from "../states/CanAddResultState"
import download from "../images/download.png"
import upload from "../images/upload.png"
import { saveAs } from "file-saver"
import RuleReady from "../states/RuleReady"

export default function ResultSelector() {
  const savedResults = ResultStatesStore()
  const resultsCounter = ResultStateCounter()
  const actionState = ActionMangament()
  const ruleState = RuleState()
  const problemState = ProblemState()
  const buttonsName = ButtonsName()
  const hardConstraint = HardConstraintState()
  const ruleSelected = RuleSelectedState()
  const ruleSynthetizedState = RuleSynthetizedState()
  const runState = RunState()
  const variableState = VariablesState()
  const whichAnomaly = WhichAnomaly()
  const canAddResultState = CanAddResultState()
  const ruleReady = RuleReady()

  const dummyVar = () => {
    const arr = []
    for (let i = 0; i < resultsCounter.counter; i++) arr.push(i)
    return arr
  }

  function parseSavedResult(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Map) {
          obj[key] = Object.fromEntries(obj[key])
        } else if (obj[key] instanceof Set) {
          obj[key] = [...obj[key]]
        }
        if (typeof obj[key] === "object") {
          parseSavedResult(obj[key])
        }
      }
    }
  }

  function isInt(number) {
    return parseInt(number) == number
  }

  function parseIntObjectUploaded(obj) {
    const newObject = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (isInt(key)) {
          const newKey = parseInt(key, 10)
          newObject[newKey] = obj[key]
        } else {
          newObject[key] = obj[key]
        }
        if (typeof obj[key] === "object") {
          parseIntObjectUploaded(obj[key])
        }
      }
    }
    return newObject
  }

  function parseObjectUploaded(objectUploaded) {
    objectUploaded.problemState = objectUploaded.problemState
    objectUploaded.ruleReady = objectUploaded.ruleReady
    objectUploaded.actionState.actions = new Map(
      Object.entries(objectUploaded.actionState.actions)
    )
    objectUploaded.buttonsName.currentState = new Map(
      Object.entries(objectUploaded.buttonsName.currentState)
    )
    objectUploaded.buttonsName.buttonsName = new Map(
      Object.entries(objectUploaded.buttonsName.buttonsName)
    )
    objectUploaded.hardConstraint.hardConstraints = new Set(
      objectUploaded.hardConstraint.hardConstraints
    )
    objectUploaded.ruleState.constraints = new Map(
      Object.entries(objectUploaded.ruleState.constraints)
    )
    for (const key of objectUploaded.ruleState.constraints.keys()) {
      const constraint = objectUploaded.ruleState.constraints.get(key)
      const newConstraint = new Map(Object.entries(constraint))
      objectUploaded.ruleState.constraints.set(key, newConstraint)
    }
    objectUploaded.ruleState.logicConnector = new Map(
      Object.entries(objectUploaded.ruleState.logicConnector)
    )
    objectUploaded.ruleState.tempConstraint = new Map(
      Object.entries(objectUploaded.ruleState.tempConstraint)
    )
    objectUploaded.ruleState.ruleString = new Map(
      Object.entries(objectUploaded.ruleState.ruleString)
    )
    for (const key of objectUploaded.ruleState.ruleString.keys()) {
      const string = objectUploaded.ruleState.ruleString.get(key)
      const newString = new Map(Object.entries(string))
      objectUploaded.ruleState.ruleString.set(key, newString)
    }
    objectUploaded.ruleState.subRuleCounter = new Map(
      Object.entries(objectUploaded.ruleState.subRuleCounter)
    )
    objectUploaded.ruleState.ruleIdCounter = new Map(
      Object.entries(objectUploaded.ruleState.ruleIdCounter)
    )
    objectUploaded.variableState.variables = new Set(
      objectUploaded.variableState.variables
    )
  }

  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row border-2 rounded-lg shadow-lg m-5 p-3 text-lg">
        <div className="flex flex-col">
          <p>Result selector: </p>
          <div className="flex flex-row">
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={upload} className="h-9 w-9" />
              </label>
              <input
                id="file-input"
                type="file"
                onChange={e => {
                  const file = e.target.files[0]
                  const fileReader = new FileReader()
                  fileReader.onload = function (fileLoadedEvent) {
                    var textFromFileLoaded = fileLoadedEvent.target.result

                    let objectsInFile = JSON.parse(textFromFileLoaded)

                    console.log("original object:", objectsInFile)

                    objectsInFile = parseIntObjectUploaded(objectsInFile)

                    console.log("object after parsing to int:", objectsInFile)

                    parseObjectUploaded(objectsInFile)

                    problemState.setStore(objectsInFile.problemState)
                    ruleReady.setStore(objectsInFile.ruleReady)
                    actionState.setStore(objectsInFile.actionState)
                    buttonsName.setStore(objectsInFile.buttonsName)
                    hardConstraint.setStore(objectsInFile.hardConstraint)
                    ruleSelected.setStore(objectsInFile.ruleSelected)
                    ruleState.setStore(objectsInFile.ruleState)
                    ruleSynthetizedState.setStore(objectsInFile.ruleSynthetized)
                    runState.setStore(objectsInFile.runState)
                    variableState.setStore(objectsInFile.variableState)
                    whichAnomaly.setStore(objectsInFile.whichAnomaly)
                  }
                  fileReader.readAsText(file, "UTF-8")
                }}
              ></input>
            </div>
            <button>
              <img
                src={download}
                className="h-9 w-9"
                onClick={() => {
                  const objectToSave = {
                    problemState: clonedeep(problemState),
                    actionState: clonedeep(actionState),
                    buttonsName: clonedeep(buttonsName),
                    hardConstraint: clonedeep(hardConstraint),
                    ruleSelected: clonedeep(ruleSelected),
                    ruleState: clonedeep(ruleState),
                    ruleSynthetized: clonedeep(ruleSynthetizedState),
                    runState: clonedeep(runState),
                    variableState: clonedeep(variableState),
                    whichAnomaly: clonedeep(whichAnomaly),
                    ruleReady: clonedeep(ruleReady),
                  }
                  parseSavedResult(objectToSave)

                  const fileToSave = new Blob([JSON.stringify(objectToSave)], {
                    type: "application/JSON",
                    name: "result.json",
                  })
                  saveAs(fileToSave, "result.json")
                }}
              ></img>
            </button>
          </div>
        </div>
        <div className="m-2"></div>
        <button
          className={
            "rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center text-lg disabled:opacity-50"
          }
          onClick={() => {
            resultsCounter.increment()
            resultsCounter.setSelected(resultsCounter.counter)
            const problemStateClone = clonedeep(problemState)
            const actionStateClone = clonedeep(actionState)
            const buttonsNameClone = clonedeep(buttonsName)
            const hardConstraintClone = clonedeep(hardConstraint)
            const ruleSelectedClone = clonedeep(ruleSelected)
            const ruleStateClone = clonedeep(ruleState)
            const ruleSynthetizedClone = clonedeep(ruleSynthetizedState)
            const runStateClone = clonedeep(runState)
            const variableStateClone = clonedeep(variableState)
            const whichAnomalyClone = clonedeep(whichAnomaly)

            savedResults.setResultStore({
              id: resultsCounter.counter,
              problemState: problemStateClone,
              actionState: actionStateClone,
              buttonsName: buttonsNameClone,
              hardConstraint: hardConstraintClone,
              ruleSelected: ruleSelectedClone,
              ruleState: ruleStateClone,
              ruleSynthetizedState: ruleSynthetizedClone,
              runState: runStateClone,
              variableState: variableStateClone,
              whichAnomaly: whichAnomalyClone,
            })

            problemState.setStore(problemStateClone)
            actionState.setStore(actionStateClone)
            buttonsName.setStore(buttonsNameClone)
            hardConstraint.setStore(hardConstraintClone)
            ruleSelected.setStore(ruleSelectedClone)
            ruleState.setStore(ruleStateClone)
            ruleSynthetizedState.setStore(ruleSynthetizedClone)
            runState.setStore(runStateClone)
            variableState.setStore(variableStateClone)
            whichAnomaly.setStore(whichAnomalyClone)
          }}
          disabled={!canAddResultState.bool}
        >
          +
        </button>
        <div className="m-2"></div>
        {dummyVar().map((v, index) => {
          const selectedClass =
            resultsCounter.selected === index
              ? "rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center"
              : "rounded-full bg-yellow-100 h-8 w-8 flex items-center justify-center"
          return (
            <div key={v}>
              <button
                className={selectedClass}
                onClick={() => {
                  resultsCounter.setSelected(index)
                  const storedProblemState = savedResults.problemState.get(
                    index
                  )
                  const storedActionState = savedResults.actionState.get(index)
                  const storedButtonsName = savedResults.buttonsName.get(index)
                  const storedHardConstraint = savedResults.hardConstraint.get(
                    index
                  )
                  const storedRuleSelected = savedResults.ruleSelected.get(
                    index
                  )
                  const storedRuleState = savedResults.ruleState.get(index)
                  const storedRuleSynthetizedState = savedResults.ruleSynthetizedState.get(
                    index
                  )
                  const storedRunState = savedResults.runState.get(index)
                  const storedVariableState = savedResults.variableState.get(
                    index
                  )
                  const storedWhichAnomaly = savedResults.whichAnomaly.get(
                    index
                  )
                  problemState.setStore(storedProblemState)
                  actionState.setStore(storedActionState)
                  buttonsName.setStore(storedButtonsName)
                  hardConstraint.setStore(storedHardConstraint)
                  ruleSelected.setStore(storedRuleSelected)
                  ruleState.setStore(storedRuleState)
                  ruleSynthetizedState.setStore(storedRuleSynthetizedState)
                  runState.setStore(storedRunState)
                  variableState.setStore(storedVariableState)
                  whichAnomaly.setStore(storedWhichAnomaly)
                }}
                key={index}
              >
                {index + 1}
              </button>
              <div className="m-2"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
