import create from "zustand"

const GraphInstance = create(set => ({
  graph: undefined,

  setGraph: graph => set(() => ({ graph: graph }))

}))

export default GraphInstance
