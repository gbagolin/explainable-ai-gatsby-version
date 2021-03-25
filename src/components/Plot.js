import React from "react"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import { Bar } from "react-chartjs-2"
import OPTIONS from "../util/PLOT_OPTIONS"

const GREEN_BACKGROUND = "green"
const RED_BACKGROUND = "red"

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
          label: ""
        })
      } else {
        dataset.push({
          data: [stateBeliefs[i].value],
          backgroundColor: (stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
            GREEN_BACKGROUND : RED_BACKGROUND,
          label: ""
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
            label: ""
          })
        } else {
          dataset.push({
            data: [1 - stateBeliefs[i].value],
            backgroundColor: !(stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
              GREEN_BACKGROUND : RED_BACKGROUND,
            label: ""
          })
        }
      }
    }
    stateIndex += 1
  }
  return dataset
}

export default function Plot() {
  const rule = RuleSynthetizedState(state => state.rule)
  console.log(rule.states)
  console.log(rule.rule[0].constraints)
  const dataset = createDatasetFromStatesList(rule.rule[0].constraints[0], rule.states)
  console.log(dataset)

  const data = {
    labels: rule.states,
    datasets: dataset
  }
  return (
    <>
      <Bar
        data={data}
        options={OPTIONS}
      />
    </>
  )
}