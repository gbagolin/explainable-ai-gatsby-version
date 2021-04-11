import create from "zustand"


const RuleSynthetizedState = create(set => ({
  rule: {
    "rule": [
      {
        "constraints": []
      }
    ],
    "states": []
  },
  setRule: (rule) => set(() => ({ rule: rule })),
  deleteConstraints: actionId => set((state) => {
    console.log(state.rule)
    if (state.rule.rule[actionId] != undefined &&
      state.rule.rule[actionId].constraints.length > 0) {
      state.rule.rule[actionId].constraints = []
    }
    if (state.rule.anomalies_same_action != undefined &&
      state.rule.anomalies_same_action.length > 0) {
      state.rule.anomalies_same_action[actionId] = []
    }
    if (state.rule.anomalies_different_action != undefined &&
      state.rule.anomalies_different_action.length > 0) {
      state.rule.anomalies_different_action[actionId] = []
    }
    return {
      rule: state.rule
    }
  })
}))

export default RuleSynthetizedState