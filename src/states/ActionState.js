import create from "zustand"

/**
 * State mangament of the current selected action.
 * @type {UseStore<{setVisible: function(*): *, visible: boolean}>}
 */
const ActionMangament = create(set => ({
  actionToAdd: "",
  actionSelected: 0,
  actionList: [],
  maxId: 0,

  setActionSelected: action => set(() => ({ actionSelected: action.actionSelected })),
  setActionList: action => set((state) => ({ actionList: state.actionList.concat([action]) })),
  setActionToAdd: action => set(() => ({ actionToAdd: action.actionToAdd })),
  incrementMaxId: () => set((state) => ({ maxId: state.maxId + 1 }))

}))

export default ActionMangament