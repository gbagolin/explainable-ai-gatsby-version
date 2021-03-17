import create from "zustand"

/**
 * State mangament of the rule.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const RuleState = create(set => ({
  problemName: "",
  traceName: "",
  subRules: [],
  variables: Set(),
  setProblemName: state => set(() => ({ problemName: state.problemName })),
  setTraceName: state => set(() => ({ traceName: state.traceName })),
  addSubRule: newSubRule => set((subRules) => ({ subRules: subRules.concat(newSubRule) })),
  addVariable: newVariables => set((variables) => (variables.add(newVariables)))

}))

export default RuleState