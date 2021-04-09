import create from "zustand"
import VIEWS from "../util/VIEWS"
import logicConnector from "../util/LOGIC_CONNECTORS"

/**
 * Map function used for names variables
 * @param element
 * @param index
 * @returns {{name, id}}
 */
function returnArray(element, index) {
  return {
    id: index,
    name: element
  }
}

const STARTING_VARIABLE_CODE = "a"

/**
 * State for ModalAction component, set first to not visible.
 * @type {UseStore<{visibile: boolean, setVisibile: function(): *}>}
 */
export const ButtonsName = create(set => ({
  currentState: [], //initial state
  buttonsName: [],
  variables: [],
  maxVariableId: [],
  variableCharacter: [],
  deltaCharacter: 0,
  addButtons: (actionSelected, problemAttributes) => set((state) => {
    state.buttonsName.push([])
    state.buttonsName[actionSelected] = problemAttributes.states.map(returnArray)
    state.currentState.push(VIEWS.STATE_BELIEF)
    state.maxVariableId.push(1)
    const nextChar = String.fromCharCode(STARTING_VARIABLE_CODE.charCodeAt(0) + state.deltaCharacter)
    state.variableCharacter.push(nextChar)
    state.deltaCharacter += 1
    return {
      currentState: state.currentState,
      buttonsName: state.buttonsName,
      startingVariableCode: nextChar,
      variables: [...state.variables, [{
        id: state.maxVariableId[actionSelected],
        name: nextChar + state.maxVariableId[actionSelected]
      }]],
      maxVariableId: state.maxVariableId,
      deltaCharacter: state.deltaCharacter
    }
  }),

  resetButtonsName: () => set(() => ({
    currentState: [], //initial state
    buttonsName: [],
    variables: [],
    maxVariableId: [],
    variableCharacter: [],
    deltaCharacter: 0
  })),

  resetButtonsHavingSpecificId: (actionId) => set((state) => {
    state.currentState.splice(actionId, 1)
    state.buttonsName.splice(actionId, 1)
    state.variables.splice(actionId, 1)
    state.maxVariableId.splice(actionId, 1)
    state.variableCharacter.splice(actionId, 1)
  }),

  goToNextState: (actionSelected, problemAttributes, args) => set((state) => {
    if (problemAttributes === undefined) {
      return
    }
    switch (+state.currentState[actionSelected]) {
      case VIEWS.LOGIC_CONNECTOR: {
        state.buttonsName[actionSelected] = problemAttributes.states.map(returnArray)
        state.currentState[actionSelected] = VIEWS.STATE_BELIEF
        return {
          buttonsName: [...state.buttonsName],
          currentState: [...state.currentState]
        }
      }

      case VIEWS.STATE_BELIEF: {
        state.buttonsName[actionSelected] = ["<", "<=", ">=", ">"].map(returnArray)
        state.currentState[actionSelected] = VIEWS.OPERATOR
        return {
          buttonsName: [...state.buttonsName],
          currentState: [...state.currentState]
        }
      }
      case VIEWS.OPERATOR: {
        state.buttonsName[actionSelected] = state.variables[actionSelected]
        state.currentState[actionSelected] = VIEWS.VARIABLE
        return {
          buttonsName: [...state.buttonsName],
          currentState: [...state.currentState]
        }
      }

      case VIEWS.VARIABLE: {
        state.buttonsName[actionSelected] = Object.keys(logicConnector).map(returnArray)
        state.currentState[actionSelected] = VIEWS.LOGIC_CONNECTOR

        const ids = state.variables[actionSelected].map(e => e.id)
        const maxId = Math.max(...ids)

        if (args.id === maxId) {
          //a new variable needs to be added
          const id = maxId + 1
          state.variables[actionSelected].push(
            {
              id: id,
              name: state.variableCharacter[actionSelected] + id
            }
          )

        }
        const max = Math.max(maxId, state.maxVariableId[actionSelected])
        state.maxVariableId[actionSelected] = max + 1
        return {
          buttonsName: [...state.buttonsName],
          currentState: [...state.currentState],
          variables: [...state.variables],
          maxVariableId: state.maxVariableId
        }
      }

      default:
        console.error("Current state is not matching any of the cases")
    }
  })
}))

export default ButtonsName