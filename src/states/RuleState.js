import create from "zustand"
import VIEWS from "../util/VIEWS"
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
  ruleString: "",
  subRuleCounter: 1,

  setProblemName: state => set(() => {
    return {
      attributes: state.attributes,
      problemName: state.problemName
    }
  }),
  setTraceName: state => set(() => ({ traceName: state.traceName })),
  setConstraint: args => set((state) => {
      switch (+args.view) {
        case VIEWS.STATE_BELIEF: {
          state.tempConstraint["state"] = args.element
          return {
            tempConstraint: state.tempConstraint
          }
        }
        case VIEWS.OPERATOR: {
          state.tempConstraint["operator"] = args.element
          return {
            tempConstraint: state.tempConstraint
          }
        }
        case VIEWS.VARIABLE: {
          state.tempConstraint["variable"] = args.element
          return {
            tempConstraint: state.tempConstraint
          }
        }
        case VIEWS.LOGIC_CONNECTOR: {
          switch (state.logicConnector) {
            case logicConnector.OR:
              //no need to add the constraint, in case
              state.constraints.push([state.tempConstraint])
              break
            case logicConnector.AND:
              const subRule = state.constraints.pop()
              subRule.push(state.tempConstraint)
              state.constraints.push(subRule)
              break
            case logicConnector.DONE:
              return {
                logicConnector: args.element.toLowerCase() === "and" ? logicConnector.AND :
                  args.element.toLowerCase() === "or" ? logicConnector.OR : logicConnector.DONE
              }
            default:
              console.error("Logic connector is not matching any case")
              break
          }
          return {
            constraints: state.constraints,
            tempConstraint: {},
            logicConnector: args.element.toLowerCase() === "and" ? logicConnector.AND :
              args.element.toLowerCase() === "or" ? logicConnector.OR : logicConnector.DONE
          }
        }
        default:
          console.error("View is not matching any case")
      }
    }
  )
}))

export default RuleState