import React from "react"
import Action from "../components/Action"
import RuleCreation from "../components/RuleCreation"
import RuleSynthetized from "../components/RuleSynthetized"
import Anomalies from "../components/Anomalies"
import Modal from "../components/ModalAddAction"

export default function Home() {
  return (
    <>
      <p className="text-center font-bold text-5xl underline text-color-yellow">Explainable AI</p>
      <div className="flex justify-around flex-row flex-wrap mt-5">
        <div className="flex flex-col">
          <Action></Action>
          <RuleCreation></RuleCreation>
        </div>
        <div className="flex flex-col flex-wrap">
          <RuleSynthetized></RuleSynthetized>
        </div>
        <div className="flex flex-col flex-wrap">
          <Anomalies></Anomalies>
        </div>
        <Modal></Modal>
      </div>
    </>
  )
}
