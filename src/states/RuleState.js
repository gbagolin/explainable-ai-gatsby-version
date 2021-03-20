import create from "zustand"
import AtomicRule from "../classes/AtomicRule"

/**
 * State mangament of the rule.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const RuleState = create(set => ({
  problemName: "",
  traceName: "",
  attributes: undefined,
  atomicRules: [],
  ruleStringOfActionSelected: [],
  setProblemName: state => set(() => {
    return {
      attributes: state.attributes,
      problemName: state.problemName
    }
  }),
  setTraceName: state => set(() => ({ traceName: state.traceName })),
  setConstraint: args => set((state) => {
    console.log("All atomic rules: ", state.atomicRules)
    let index = 0
    for (let i = 0; i < state.atomicRules.length; i++) {
      if (args.action_id === state.atomicRules[i].action_id) {
        index = i
        break
      }
    }
    state.atomicRules[index].setConstraint(args)
    return {
      atomicRules: [...state.atomicRules]
    }
  }),
  addAtomicRule: (action_id) => set((state) => ({
    atomicRules: state.atomicRules.concat(AtomicRule(action_id))
  })),

  getRuleStringOfActionSelected: selectedAction => set((state) => {
    console.log("All atomic rules: ", state.atomicRules)
    if (state.atomicRules[selectedAction] === undefined) {
      return {
        ruleStringOfActionSelected: []
      }
    } else {
      return { ruleStringOfActionSelected: state.atomicRules[selectedAction].ruleString }
    }
  })

}))

export default RuleState