import create from "zustand"

/**
 * State mangament of the current selected action.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const ActionMangament = create(set => ({
  actionToAdd: "",
  actionSelected: 0,
  actionList: [],
  actionCounter: 0,
  setActionSelected: action => set(() => ({ actionSelected: action.actionSelected })),
  addActionToList: action => set((state) => {
    state.actionList.push(action)
    return {
      actionList: state.actionList
    }
  }),
  setActionToAdd: action => set(() => ({ actionToAdd: action.actionToAdd })),
  incrementActionCounter: () => set((state) => ({ actionCounter: state.actionCounter + 1 })),
  reset: () => set(() => ({
    actionToAdd: "",
    actionSelected: 0,
    actionList: [],
    actionCounter: 0
  })),
  deleteAction: (actionId) => set((state) => {
    state.actionList.splice(actionId, 1)
    return {
      actionList: state.actionList,
      actionCounter: state.actionCounter - 1,
      actionSelected: state.actionSelected - 1
    }
  })
}))

export default ActionMangament