import create from "zustand"
import axios from "axios"

/**
 * ENUM used to keep track of current state
 * @type {{STATE_BELIEF: number, OPERATOR: number, LOGIC_CONNECTOR: number}}
 */
const states = {
  STATE_BELIEF: 0,
  OPERATOR: 1,
  LOGIC_CONNECTOR: 2
}

/**
 * State for ModalAction component, set first to not visible.
 * @type {UseStore<{visibile: boolean, setVisibile: function(): *}>}
 */
const ButtonsName = create(set => ({
  currentState: states.STATE_BELIEF, //initial state
  buttonsName: [],
  goToNextState: problemsName => set(async (currentState) => {

    try {
      const response = await axios.post("http://localhost:8001/api/get_attributes_from_problem", { name: problemsName })
      console.log("Resonse: ", response.data)
    } catch (e) {
      console.log(e)
    }

    switch (currentState) {
      case states.STATE_BELIEF:
        return {
          buttonsName: [],
          currentState: states.OPERATOR
        }
      case states.OPERATOR:
        return {
          currentState: states.LOGIC_CONNECTOR
        }
      case states.LOGIC_CONNECTOR:
        return {
          currentState: states.STATE_BELIEF
        }
      default:
        break
    }
  })
}))

export default ButtonsName