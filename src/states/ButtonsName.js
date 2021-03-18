import create from "zustand"
import views from "../util/views"
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
  currentState: views.LOGIC_CONNECTOR, //initial state
  buttonsName: [],
  variables: [{ id: 1, name: "x1" }],
  goToNextState: (problemAttributes, args) => set((state) => {
    if (problemAttributes === undefined) {
      return
    }
    switch (state.currentState) {
      case views.LOGIC_CONNECTOR:
        return {
          buttonsName: problemAttributes.states.map(returnArray),
          currentState: views.STATE_BELIEF
        }
      case views.STATE_BELIEF:
        return {
          buttonsName: ["<", "<=", ">=", ">"].map(returnArray),
          currentState: views.OPERATOR
        }
      case views.OPERATOR:
        return {
          buttonsName: state.variables,
          currentState: views.VARIABLE
        }
      case views.VARIABLE:
        const ids = state.variables.map(e => e.id)
        const maxId = Math.max(...ids)
        //a new variable need to be added
        if (args.id === maxId) {
          const id = maxId + 1
          state.variables.push({ id: id, name: "x" + id })
        }
        return {
          buttonsName: Object.keys(logicConnector).map(returnArray),
          currentState: views.LOGIC_CONNECTOR,
          variables: state.variables
        }
      default:
        console.error("Current state is not matching any of the cases")
    }
  })
}))

export default ButtonsName