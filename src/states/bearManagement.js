import create from "zustand"

/**
 * Example of state management
 * @type {UseStore<{removeAllBears: function(): *, bears: number, increasePopulation: function(): *}>}
 */
const bearManagament = create(set => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

export default bearManagament