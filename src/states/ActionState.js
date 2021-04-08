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
  setActionList: action => set((state) => ({ actionList: state.actionList.concat([action]) })),
  setActionToAdd: action => set(() => ({ actionToAdd: action.actionToAdd })),
  incrementActionCounter: () => set((state) => ({ actionCounter: state.actionCounter + 1 })),
  reset: () => set(() => ({
    actionToAdd: "",
    actionSelected: 0,
    actionList: [],
    actionCounter: 0
  }))
}))

export default ActionMangament