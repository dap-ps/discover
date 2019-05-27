export default (map, defaultState) => (currentState, action) => {
  const state = !currentState ? defaultState : currentState

  if (!action) {
    return state
  }

  return Object.keys(map).includes(action.type)
    ? map[action.type](state, action.payload)
    : state
}
