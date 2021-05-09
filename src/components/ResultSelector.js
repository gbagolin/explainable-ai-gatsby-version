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
import { saveAs } from "file-saver"

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

  function parseObjectUploaded(objectUploaded){
    objectUploaded.actionState = new Map(Object.entries(objectUploaded.actionState))
    for(const key of objectUploaded.actionState.keys()){
      const element = objectUploaded.actionState.get(key)
      element.actions = new Map(Object.entries(element.actions))
      objectUploaded.actionState.set(key, element)
    }
  }

  return (
    <div className="flex flex-row justify-start">
      <div className="flex flex-row border-2 rounded-lg shadow-lg m-5 p-3 text-lg">
        <div className="flex flex-col">
          <p>Result selector: </p>
          {/* <input
            className="w-9 h-9 disabled:opacity-50"
            type="file"
            src={download}
            onChange={e => {
              const file = e.target.files[0]
              const fileReader = new FileReader()
              fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result
                const objectsInFile = JSON.parse(textFromFileLoaded)
                parseObjectUploaded(objectsInFile)
                savedResults.setActionStore(objectsInFile.actionState)
                console.log(objectsInFile.actionState)
                actionState.setStore(objectsInFile.actionState)
                console.log(actionState)
              }
              fileReader.readAsText(file, "UTF-8")
            }}
          /> */}
        </div>
        <div className="m-2"></div>
        <button
          className={
            "rounded-full bg-yellow-300 h-8 w-8 flex items-center justify-center text-lg disabled:opacity-50"
          }
          onClick={() => {
            const tempObjectToSave = clonedeep(savedResults)
            console.log("Prima: ", tempObjectToSave)
            parseSavedResult(tempObjectToSave)
            console.log("Dopo:", tempObjectToSave)

            const objectToSave = {
              problemState: tempObjectToSave.problemState,
              actionState: tempObjectToSave.actionState,
              buttonsName: tempObjectToSave.buttonsName,
              hardConstraint: tempObjectToSave.hardConstraint,
              ruleSelected: tempObjectToSave.ruleSelected,
              ruleState: tempObjectToSave.ruleState,
              ruleSynthetizedState: tempObjectToSave.ruleSynthetizedState,
              runState: tempObjectToSave.runState,
              variableState: tempObjectToSave.variableState,
              whichAnomaly: tempObjectToSave.whichAnomaly,
            }
            console.log("object to save: ", objectToSave)
            const fileToSave = new Blob([JSON.stringify(objectToSave)], {
              type: "application/JSON",
              name: "prova.json",
            })
            saveAs(fileToSave, "prova.json")

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
            <>
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
            </>
          )
        })}
      </div>
    </div>
  )
}
