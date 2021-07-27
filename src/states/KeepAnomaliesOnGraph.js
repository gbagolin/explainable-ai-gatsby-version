import create from "zustand"

const KeepAnomaliesOnGraph = create(set => ({
  keepAnomaliesOnGraph: false,
  changeToOpposite: () =>
    set((state) => ({
      keepAnomaliesOnGraph: !state.keepAnomaliesOnGraph
    }))
}))

export default KeepAnomaliesOnGraph
