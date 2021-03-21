import create from "zustand"

import VIEWS from '../util/VIEWS'
import logicConnector from '../util/LOGIC_CONNECTORS'

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
  logicConnector: [],
  tempConstraint: [],
  ruleString: [],
  subRuleCounter: [],

  addRule: () => set((state) => ({
    constraints: [...state.constraints, []],
    variables: [...state.variables, []],
    logicConnector: [...state.logicConnector, logicConnector.OR],
    tempConstraint: [...state.tempConstraint, {}],
    ruleString: [...state.ruleString, []],
    subRuleCounter: [...state.subRuleCounter, 1]
  })),

  setProblemName: state => set(() => {
    return {
      attributes: state.attributes,
      problemName: state.problemName
    }
  }),

  setTraceName: state => set(() => ({ traceName: state.traceName })),

  setConstraint: args => set((state) => {
    console.log("Action selected: ", args.actionSelected)
    console.log("Rule string: ", state.ruleString)
    switch (+args.view) {
      case VIEWS.STATE_BELIEF: {
        //Edit rule String.
        if (state.logicConnector[args.actionSelected] === logicConnector.OR) {
          state.ruleString[args.actionSelected].push(args.element)
        } else {
          if (state.ruleString[args.actionSelected].length === 0) {
            state.ruleString[args.actionSelected].push("")
          }
          let tempRuleString = state.ruleString[args.actionSelected].pop()
          tempRuleString += " " + args.element
          state.ruleString[args.actionSelected].push(tempRuleString)
        }
        state.tempConstraint[args.actionSelected]["state"] = args.element
        return {
          ruleString: [...state.ruleString],
          tempConstraint: state.tempConstraint
        }
      }
      case VIEWS.OPERATOR: {
        let rule = state.ruleString[args.actionSelected].pop()
        rule += " " + args.element
        state.ruleString[args.actionSelected].push(rule)
        state.tempConstraint[args.actionSelected]["operator"] = args.element
        return {
          ruleString: [...state.ruleString],
          tempConstraint: state.tempConstraint
        }
      }
      case VIEWS.VARIABLE: {
        let rule = state.ruleString[args.actionSelected].pop()
        rule += " " + args.element
        state.ruleString[args.actionSelected].push(rule)
        state.tempConstraint[args.actionSelected]["variable"] = args.element
        return {
          ruleString: [...state.ruleString],
          tempConstraint: state.tempConstraint
        }
      }
      case VIEWS.LOGIC_CONNECTOR: {
        if (args.element.toLowerCase() === "and") {
          let rule = state.ruleString[args.actionSelected].pop()
          rule += " " + args.element.toLowerCase()
          state.ruleString[args.actionSelected].push(rule)
        }
        switch (state.logicConnector[args.actionSelected]) {
          case logicConnector.OR:
            //no need to add the constraint, in case
            state.constraints[args.actionSelected].push([state.tempConstraint[args.actionSelected]])
            break
          case logicConnector.AND:
            const subRule = state.constraints[args.actionSelected].pop()
            subRule.push(state.tempConstraint[args.actionSelected])
            state.constraints[args.actionSelected].push(subRule)
            break
          case logicConnector.DONE:
            const logic = args.element.toLowerCase() === "and" ? logicConnector.AND :
              args.element.toLowerCase() === "or" ? logicConnector.OR : logicConnector.DONE
            state.logicConnector[args.actionSelected] = logic
            return {
              logicConnector: state.logicConnector
            }
          default:
            console.error("Logic connector is not matching any case")
            break
        }
        const logic = args.element.toLowerCase() === "and" ? logicConnector.AND :
          args.element.toLowerCase() === "or" ? logicConnector.OR : logicConnector.DONE

        state.logicConnector[args.actionSelected] = logic
        state.tempConstraint[args.actionSelected] = {}

        return {
          ruleString: [...state.ruleString],
          constraints: state.constraints,
          tempConstraint: state.tempConstraint,
          logicConnector: state.logicConnector
        }
      }
      default:
        console.error("View is not matching any case")
    }
  }
  )
}))

export default RuleState