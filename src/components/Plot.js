import React from "react"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import { Bar } from "react-chartjs-2"
import OPTIONS from "../util/PLOT_OPTIONS"
import ActionMangament from "../states/ActionState"

const RED_BACKGROUND = "rgba(255, 99, 132, 0.5)"
const RED_COLOR = "rgb(255, 99, 132)"

const GREEN_BACKGROUND = "rgba(75, 192, 192, 0.5)"
const GREEN_COLOR = "rgb(75, 192, 192)"

function createDatasetFromStatesList(stateList, states) {
  const dataset = []
  //for each state
  let stateIndex = 0
  for (const state of states) {
    //get all the object which are of the same state
    const stateBeliefs = stateList.filter((e) => e.state === state)
    stateBeliefs.sort((a, b) => a.value - b.value)
    console.log("State beliefs: ", stateBeliefs)
    //for each object
    for (let i = 0; i < stateBeliefs.length; i++) {
      //if the state index in the states list is not 0, than element
      //are already present and beliefs needs to be added to those objects.
      if (stateIndex > 0) {
        const data = []
        //push 0 to data list
        for (let j = 0; j < stateIndex; j++) {
          data.push(0)
        }
        data.push(stateBeliefs[i].value)
        dataset.push({
          data: data,
          backgroundColor: (stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
            GREEN_BACKGROUND : RED_BACKGROUND,
          label: "",
          borderColor: (stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
            GREEN_COLOR : RED_COLOR
        })
      } else {
        dataset.push({
          data: [stateBeliefs[i].value],
          backgroundColor: (stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
            GREEN_BACKGROUND : RED_BACKGROUND,
          label: "",
          borderColor: (stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
            GREEN_COLOR : RED_COLOR
        })
      }

      //check if this is the last element:
      //in that case also the last "additional" element must be put insert:
      if (i === stateBeliefs.length - 1) {
        if (stateIndex > 0) {
          const data = []
          //push 0 to data list
          for (let j = 0; j < stateIndex; j++) {
            data.push(0)
          }
          //the last element will be 1 - the previous element
          data.push(1 - stateBeliefs[i].value)
          dataset.push({
            data: data,
            //the color is the opposite of the last element.
            backgroundColor: !(stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
              GREEN_BACKGROUND : RED_BACKGROUND,
            label: "",
            borderColor: !(stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
              GREEN_COLOR : RED_COLOR
          })
        } else {
          dataset.push({
            data: [1 - stateBeliefs[i].value],
            backgroundColor: !(stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
              GREEN_BACKGROUND : RED_BACKGROUND,
            label: "",
            borderColor: !(stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
              GREEN_COLOR : RED_COLOR
          })
        }
      }
    }
    stateIndex += 1
  }
  return dataset
}

const datasetKeyProvider = () => {
  return btoa(Math.random()).substring(0, 12)
}

export default function Plot() {
  const rule = RuleSynthetizedState(state => state.rule)
  const actionSelected = ActionMangament(state => state.actionSelected)
  const actionString = ActionMangament(state => state.actionList)[actionSelected]
  return (
    <>
      {
        ((rule.rule[actionSelected] || {}).constraints || []).map((constraintInOr, index) => {
          const dataset = createDatasetFromStatesList(constraintInOr, rule.states)
          const data = {
            labels: rule.states,
            datasets: dataset
          }
          return (
            < Bar
              key={actionString + index}
              data={data}
              options={OPTIONS}
              datasetKeyProvider={datasetKeyProvider}
            />
          )
        })
      }
    </>
  )
}