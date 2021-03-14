import create from "zustand"

/**
 * State mangament of the problem choosen by the user.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const TraceChoosenState = create(set => ({
  name: "",
  setTrace: state => set(() => ({ name: state.name }))
}))

export default TraceChoosenState