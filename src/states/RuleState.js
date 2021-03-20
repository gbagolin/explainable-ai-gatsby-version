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
  ruleString: [],
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
          //Edit rule String.
          if (state.logicConnector === logicConnector.OR) {
            state.ruleString.push(args.element)
          } else {
            if (state.ruleString.length === 0) {
              state.ruleString.push("")
            }
            let tempRuleString = state.ruleString.pop()
            tempRuleString += " " + args.element
            state.ruleString.push(tempRuleString)
          }
          state.tempConstraint["state"] = args.element
          return {
            ruleString: [...state.ruleString],
            tempConstraint: state.tempConstraint
          }
        }
        case VIEWS.OPERATOR: {
          let rule = state.ruleString.pop()
          rule += " " + args.element
          state.ruleString.push(rule)
          state.tempConstraint["operator"] = args.element
          return {
            ruleString: [...state.ruleString],
            tempConstraint: state.tempConstraint
          }
        }
        case VIEWS.VARIABLE: {
          let rule = state.ruleString.pop()
          rule += " " + args.element
          state.ruleString.push(rule)
          state.tempConstraint["variable"] = args.element
          return {
            ruleString: [...state.ruleString],
            tempConstraint: state.tempConstraint
          }
        }
        case VIEWS.LOGIC_CONNECTOR: {
          if (args.element.toLowerCase() === "and") {
            let rule = state.ruleString.pop()
            rule += " " + args.element.toLowerCase()
            state.ruleString.push(rule)
          }
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
            ruleString: [...state.ruleString],
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