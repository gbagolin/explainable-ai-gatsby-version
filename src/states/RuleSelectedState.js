import create from "zustand"

/**
 * TODO: add the comment here
 * @type {UseStore<{setRuleString: function(*=): *, ruleString: string, setIndex: function(*=): *, index: string}>}
 */
const RuleSelectedState = create(set => ({
  ruleString: "",
  ruleId: undefined,
  actionId: undefined,
  setStore: store => set(() => store),
  setRuleString: newRuleString =>
    set(() => ({
      ruleString: newRuleString,
    })),
  setRuleId: id =>
    set(() => ({
      ruleId: id,
    })),
  setActionId: id =>
    set(() => ({
      actionId: id,
    })),
}))

export default RuleSelectedState
