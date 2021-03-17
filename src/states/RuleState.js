import create from "zustand"

/**
 * State mangament of the rule.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const RuleState = create(set => ({
  problemName: "",
  traceName: "",
  attributes: undefined,
  variables: [],
  constraints: [],
  setProblemName: state => set(() => {
    return {
      attributes: state.attributes,
      problemName: state.problemName
    }
  }),
  setTraceName: state => set(() => ({ traceName: state.traceName })),
  setConstraint: args => set(() => {
      console.log("eh eh... ")
    }
  ),
  addConstraint: constraint => set((state) => (state.constraint.push(constraint)))
}))

export default RuleState