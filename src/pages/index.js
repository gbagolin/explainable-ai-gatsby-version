import React from "react"
import ActionSelection from "../components/ActionSelection"
import RuleCreation from "../components/RuleCreation"
import RuleSynthetized from "../components/RuleSynthetized"
import Anomalies from "../components/Anomalies"
import ModalAddAction from "../components/ModalAddAction"
import ProblemSelection from "../components/ProblemSelection"
import ModalProblemSelection from "../components/ModalProblemSelection"
import ModalRuleCreation from "../components/ModalRuleCreation"
import Plot from "../components/Plot"
import ModalRuleEdit from "../components/ModalRuleEdit"

export default function Home() {
  return (
    <>
      <p className="text-center font-bold text-5xl underline text-color-yellow">Explainable POMCP</p>
      <div className="flex flex-wrap justify-start 2xl:justify-around flex-row mt-5">
        <div className="flex flex-col flex-shrink">
          <ProblemSelection></ProblemSelection>
          <ActionSelection></ActionSelection>
          <RuleCreation></RuleCreation>
        </div>
        <div className="flex flex-col flex-shrink">
          <RuleSynthetized></RuleSynthetized>
          <Plot></Plot>
        </div>
        <div className="flex flex-col flex-shrink">
          <Anomalies></Anomalies>
        </div>
        <ModalAddAction></ModalAddAction>
        <ModalProblemSelection></ModalProblemSelection>
        <ModalRuleCreation></ModalRuleCreation>
        <ModalRuleEdit></ModalRuleEdit>
      </div>
    </>
  )
}
