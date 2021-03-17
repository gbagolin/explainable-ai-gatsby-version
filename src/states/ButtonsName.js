import create from "zustand"

/**
 * ENUM used to keep track of current state
 * @type {{STATE_BELIEF: number, OPERATOR: number, LOGIC_CONNECTOR: number}}
 */
const views = Object.freeze({
  STATE_BELIEF: 0,
  OPERATOR: 1,
  VARIABLE: 2,
  LOGIC_CONNECTOR: 3
})


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
  currentState: views.STATE_BELIEF, //initial state
  buttonsName: [],
  variables: [{ id: 1, name: "x1" }],
  goToNextState: (problemAttributes) => set((state) => {
    if (problemAttributes === undefined) {
      return
    }
    if (state.currentState === views.STATE_BELIEF) {
      return {
        buttonsName: problemAttributes.states.map(returnArray),
        currentState: views.OPERATOR
      }
    } else if (state.currentState === views.OPERATOR) {
      return {
        buttonsName: ["<", "<=", ">=", ">"].map(returnArray),
        currentState: views.VARIABLE
      }
    } else if (state.currentState === views.VARIABLE) {
      return {
        buttonsName: state.variables,
        currentState: views.LOGIC_CONNECTOR
      }
    } else if (state.currentState === views.LOGIC_CONNECTOR) {
      return {
        buttonsName: ["and", "or"].map(returnArray),
        currentState: views.STATE_BELIEF
      }
    } else {
      console.log("problema")
    }
  })
}))

export default ButtonsName