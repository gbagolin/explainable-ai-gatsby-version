import create from "zustand"
import views from "../util/views"

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
      switch (args.view) {
        case views.STATE_BELIEF:
          return {

          }
      }
    }
  ),
  addConstraint: constraint => set((state) => (state.constraint.push(constraint)))
}))

export default RuleState