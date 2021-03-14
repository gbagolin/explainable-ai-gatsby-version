import create from "zustand"

/**
 * State mangament of the rule.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const RuleState = create(set => ({
  problemName: "",
  traceName: "",
  setProblemName: state => set(() => ({ problemName: state.problemName })),
  setTraceName: state => set(() => ({ traceName: state.traceName })),
}))

export default RuleState