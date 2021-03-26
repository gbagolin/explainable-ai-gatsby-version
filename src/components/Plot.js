import React from "react"
import RuleSynthetizedState from "../states/RuleSynthetizedState"
import { Bar } from "react-chartjs-2"
import { OPTIONS, RED_COLOR, RED_BACKGROUND, GREEN_COLOR, GREEN_BACKGROUND, GREY_BACKGROUND, GREY_COLOR } from "../util/PLOT_OPTIONS"
import ActionMangament from "../states/ActionState"


/**
 * Create the whole dataset given the list of constraints in and as represented in the rule object
 * @param stateList List of constraints in and
 * @param states List of problem states
 * @returns {[]}
 */
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
    let sum = 0
    //no analysis on this state, so a gray bar is added.
    if (stateBeliefs.length === 0) {
      const data = []
      for (let j = 0; j < stateIndex; j++) {
        data.push(0)
      }
      data.push(1)
      dataset.push({
        data: data,
        backgroundColor: GREY_BACKGROUND,
        label: "",
        borderColor: GREY_COLOR
      })
    }
    for (let i = 0; i < stateBeliefs.length; i++) {
      const valueToPush = i > 0 ? Math.abs(sum - stateBeliefs[i].value) : stateBeliefs[i].value
      sum += valueToPush
      //if the state index in the states list is not 0, than element
      //are already present and beliefs needs to be added to those objects.
      if (stateIndex > 0) {
        const data = []
        //push 0 to data list
        for (let j = 0; j < stateIndex; j++) {
          data.push(0)
        }
        data.push(valueToPush)
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
          data: [valueToPush],
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
          data.push(1 - sum)
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
            data: [1 - sum],
            backgroundColor: !(stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
              GREEN_BACKGROUND : RED_BACKGROUND,
            label: "",
            borderColor: !(stateBeliefs[i].operator === "<" || stateBeliefs[i].operator === "<=") ?
              GREEN_COLOR : RED_COLOR
          })
        }
      }
    }
    //draw here all anomalies
    stateIndex += 1
  }
  return dataset
}

function createScatterDataset(anomalies, stateList) {
  const dataset = []
  for (let indexState = 0; indexState < stateList.length; indexState++) {
    for (let indexAnomaly = 0; indexAnomaly < anomalies.length; indexAnomaly++) {
      const stateBelief = anomalies[indexAnomaly].beliefs.find(belief => belief.state === stateList[indexState])
      const label = anomalies[indexAnomaly].run + " " + anomalies[indexAnomaly].step

      if (indexState > 0) {
        const data = []
        for (let i = 0; i < indexState; i++) {
          data.push(0)
        }
        data.push(stateBelief.belief)
        dataset.push({
          data: data,
          type: "scatter",
          radius: 5,
          label: label,
          backgroundColor: "rgba(0, 0, 255,0.5)"
        })
      } else {
        const data = []
        data.push(stateBelief.belief)
        dataset.push({
          data: data,
          type: "scatter",
          radius: 5,
          label: label,
          backgroundColor: "rgba(0, 0, 255,0.5)"
        })
      }
    }
  }
  return dataset
}

/**
 * Creates a unique string used for the <Bar> component
 * @returns {string}
 */
const datasetKeyProvider = () => {
  return btoa(Math.random()).substring(0, 12)
}

export default function Plot() {
  const rule = RuleSynthetizedState(state => state.rule)
  const actionSelected = ActionMangament(state => state.actionSelected)
  const actionString = ActionMangament(state => state.actionList)[actionSelected]
  const anomalies = (((rule.anomalies_same_action || [])[actionSelected] || {}).anomalies || [])
  const scatterDataset = createScatterDataset(anomalies, rule.states)
  console.log(scatterDataset)
  return (
    <>
      {
        ((rule.rule[actionSelected] || {}).constraints || []).map((constraintInOr, index) => {
          const dataset = createDatasetFromStatesList(constraintInOr, rule.states)

          console.log(dataset)
          const data = {
            labels: rule.states,
            datasets: dataset.concat(scatterDataset)
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