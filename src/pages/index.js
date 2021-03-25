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

export default function Home() {
  return (
    <>
      <p className="text-center font-bold text-5xl underline text-color-yellow">Explainable AI</p>
      <div className="flex justify-around flex-row flex-wrap mt-5">
        <div className="flex flex-col">
          <ProblemSelection></ProblemSelection>
          <ActionSelection></ActionSelection>
          <RuleCreation></RuleCreation>
        </div>
        <div className="flex flex-col flex-wrap">
          <RuleSynthetized></RuleSynthetized>
          <Plot></Plot>
        </div>
        <div className="flex flex-col flex-wrap">
          <Anomalies></Anomalies>
        </div>
        <ModalAddAction></ModalAddAction>
        <ModalProblemSelection></ModalProblemSelection>
        <ModalRuleCreation></ModalRuleCreation>
      </div>
    </>
  )
}
