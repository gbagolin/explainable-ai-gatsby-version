import logicConnector from "../util/LOGIC_CONNECTORS"
import VIEWS from "../util/VIEWS"


const AtomicRule = function(action_id) {
  const rule = {}
  rule.action_id = action_id
  rule.constraints = []
  rule.variables = []
  rule.logicConnector = logicConnector.OR
  rule.ruleString = []
  rule.tempConstraint = {}
  rule.setConstraint = setConstraint
  return rule
}

export default AtomicRule

function setConstraint(args) {
  switch (+args.view) {
    case VIEWS.STATE_BELIEF: {
      //Edit rule String.
      if (this.logicConnector === logicConnector.OR) {
        this.ruleString.push(args.element)
      } else {
        if (this.ruleString.length === 0) {
          this.ruleString.push("")
        }
        let tempRuleString = this.ruleString.pop()
        tempRuleString += " " + args.element
        this.ruleString.push(tempRuleString)
      }
      this.tempConstraint["state"] = args.element
      break
    }
    case VIEWS.OPERATOR: {
      let rule = this.ruleString.pop()
      rule += " " + args.element
      this.ruleString.push(rule)
      this.tempConstraint["operator"] = args.element
      break
    }
    case VIEWS.VARIABLE: {
      let rule = this.ruleString.pop()
      rule += " " + args.element
      this.ruleString.push(rule)
      this.tempConstraint["variable"] = args.element
      break
    }
    case VIEWS.LOGIC_CONNECTOR: {
      if (args.element.toLowerCase() === "and") {
        let rule = this.ruleString.pop()
        rule += " " + args.element.toLowerCase()
        this.ruleString.push(rule)
        break
      }
      switch (this.logicConnector) {
        case logicConnector.OR:
          //no need to add the constraint, in case
          this.constraints.push([this.tempConstraint])
          break
        case logicConnector.AND:
          const subRule = this.constraints.pop()
          subRule.push(this.tempConstraint)
          this.constraints.push(subRule)
          break
        case logicConnector.DONE: {
          this.logicConnector = args.element.toLowerCase() === "and" ? logicConnector.AND :
            args.element.toLowerCase() === "or" ? logicConnector.OR : logicConnector.DONE
          break
        }
        default:
          console.error("Logic connector is not matching any case")
          break
      }
      this.tempConstraint = {}
      this.logicConnector = args.element.toLowerCase() === "and" ? logicConnector.AND :
        args.element.toLowerCase() === "or" ? logicConnector.OR : logicConnector.DONE
      break
    }
    default:
      console.error("View is not matching any case")
      break
  }
}

