import create from "zustand"


const RuleSynthetizedState = create(set => ({
  rule: { "rule": [{ "constraints": [] }] },
  setRule: (rule) => set(() => ({ rule: rule }))
}))

export default RuleSynthetizedState