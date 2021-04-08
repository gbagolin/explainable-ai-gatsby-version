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

/**
 * State for ModalAction component, set first to not visible.
 * @type {UseStore<{visibile: boolean, setVisibile: function(): *}>}
 */
const ButtonsName = create(set => ({
  currentState: [], //initial state
  buttonsName: [],
  variables: [],
  maxVariableId: 1,
  addButtons: (actionSelected, problemAttributes) => set((state) => {
    state.buttonsName.push([])
    state.buttonsName[actionSelected] = problemAttributes.states.map(returnArray)
    state.currentState.push(VIEWS.STATE_BELIEF)
    return {
      currentState: state.currentState,
      buttonsName: state.buttonsName,
      variables: [...state.variables, [{
        id: state.maxVariableId,
        name: "x" + state.maxVariableId
      }]]
    }
  }),

  resetButtonsName: () => set(() => ({
    currentState: [], //initial state
    buttonsName: [],
    variables: [],
    maxVariableId: 1
  })),

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
        //a new variable need to be added
        if (args.id === maxId) {
          const id = maxId + 1
          state.variables[actionSelected].push({ id: id, name: "x" + id })

        }
        const max = Math.max(maxId, state.maxVariableId)
        return {
          buttonsName: [...state.buttonsName],
          currentState: [...state.currentState],
          variables: [...state.variables],
          maxVariableId: max + 1
        }
      }

      default:
        console.error("Current state is not matching any of the cases")
    }
  })
}))

export default ButtonsName