import create from "zustand"

/**
 * State mangament of the rule.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const RuleState = create(set => ({
  problemName: "",
  traceName: "",
  attributes: undefined,
  variables: Set,
  setProblemName: state => set(() => {
    return {
      attributes: state.attributes,
      problemName: state.problemName
    }
  }),
  setTraceName: state => set(() => ({ traceName: state.traceName }))
}))

export default RuleState