import create from "zustand"
import HardConstraintClass from "../classes/HardConstraintClass"

const HardConstraint = create(set => ({
  /**
   * List of class objects HardConstraintClass
   */
  hardConstraints: [],
  /**
   * Add an hard constraint to the list.
   * @param {*} constraint new object of the class HardConstranintClass
   * @returns updated states
   */
  addHardConstraint: constraint =>
    set(state => {
      state.hardConstraints.push(constraint)
      return {
        hardConstraints: state.hardConstraints,
      }
    }),
}))

export default HardConstraint
