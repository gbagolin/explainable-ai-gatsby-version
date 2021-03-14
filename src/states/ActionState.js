import create from "zustand"

/**
 * State mangament of the current selected action.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const ActionMangament = create(set => ({
  actionToAdd: "",
  actionSelected: "",
  actionList: [],
  setActionSelected: action => set(() => ({ actionSelected: action.actionSelected })),
  setActionList: action => set((state) => ({ actionList: state.actionList.concat([action]) })),
  setActionToAdd: action => set(() => ({ actionToAdd: action.actionToAdd }))
}))

export default ActionMangament