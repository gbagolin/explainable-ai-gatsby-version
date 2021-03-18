import create from "zustand"
import views from "../util/views"
import logicConnector from "../util/LOGIC_CONNECTORS"

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
  logicConnector: logicConnector.OR,
  tempConstraint: {},
  setProblemName: state => set(() => {
    return {
      attributes: state.attributes,
      problemName: state.problemName
    }
  }),
  setTraceName: state => set(() => ({ traceName: state.traceName })),
  setConstraint: args => set((state) => {
      switch (+args.view) {
        case views.STATE_BELIEF: {
          state.tempConstraint["state"] = args.element
          return {
            tempConstraint: state.tempConstraint
          }
        }
        case views.OPERATOR: {
          state.tempConstraint["operator"] = args.element
          return {
            tempConstraint: state.tempConstraint
          }
        }
        case views.VARIABLE: {
          state.tempConstraint["variable"] = args.element
          return {
            tempConstraint: state.tempConstraint
          }
        }
        case views.LOGIC_CONNECTOR: {
          if (state.logicConnector === logicConnector.OR) {
            state.constraints.push([state.tempConstraint])
          } else {
            const subRule = state.constraints.pop()
            subRule.push(state.tempConstraint)
            state.constraints.push(subRule)
          }
          return {
            constraints: state.constraints,
            tempConstraint: {},
            logicConnector: args.element.toLowerCase() === "or" ? logicConnector.OR : logicConnector.AND
          }
        }
        default:
          console.error("View is not matching any case")
      }
    }
  ),
  addConstraint: constraint => set((state) => (state.constraint.push(constraint)))
}))

export default RuleState