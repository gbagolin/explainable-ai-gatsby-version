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
  currentState: VIEWS.LOGIC_CONNECTOR, //initial state
  buttonsName: [],
  variables: [{ id: 1, name: "x1" }],
  goToNextState: (problemAttributes, args) => set((state) => {
    if (problemAttributes === undefined) {
      return
    }
    switch (state.currentState) {
      case VIEWS.LOGIC_CONNECTOR:
        return {
          buttonsName: problemAttributes.states.map(returnArray),
          currentState: VIEWS.STATE_BELIEF
        }
      case VIEWS.STATE_BELIEF:
        return {
          buttonsName: ["<", "<=", ">=", ">"].map(returnArray),
          currentState: VIEWS.OPERATOR
        }
      case VIEWS.OPERATOR:
        return {
          buttonsName: state.variables,
          currentState: VIEWS.VARIABLE
        }
      case VIEWS.VARIABLE:
        const ids = state.variables.map(e => e.id)
        const maxId = Math.max(...ids)
        //a new variable need to be added
        if (args.id === maxId) {
          const id = maxId + 1
          state.variables.push({ id: id, name: "x" + id })
        }
        return {
          buttonsName: Object.keys(logicConnector).map(returnArray),
          currentState: VIEWS.LOGIC_CONNECTOR,
          variables: state.variables
        }
      default:
        console.error("Current state is not matching any of the cases")
    }
  })
}))

export default ButtonsName