import create from "zustand"

/**
 * State for ModalAction component, set first to not visible.
 * @type {UseStore<{visibile: boolean, setVisibile: function(): *}>}
 */
const modalActionState = create(set => ({
  visible: false,
  setVisible: stateVisible => set(() => ({ visible: stateVisible.visible }))
}))

export default modalActionState