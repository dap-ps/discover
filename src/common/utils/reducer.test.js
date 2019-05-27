import util from './reducer'

describe('reducer utility', () => {
  const reducers = {
    TEST_ACTION: (state, payload) => ({
      ...state,
      ...payload,
    }),
  }

  const state = { foo: 'bar' }
  const action = { type: 'TEST_ACTION', payload: { baz: true } }
  const missingAction = { type: 'MISSING_ACTION' }
  const reducer = util(reducers, state)

  test("it should return the existing state when the action doesn't exist", () => {
    // Given an existing state
    // And an action we can't reduce

    // We should expect the function to pass through the existing state
    expect(reducer(state, missingAction)).toEqual({ foo: 'bar' })
  })

  test('it should call the correct reducer when the action exists', () => {
    // Given an existing state
    // And an action we can reduce

    // We expect the function to return the correctly reduced new state
    expect(reducer(state, action)).toEqual({
      foo: 'bar',
      baz: true,
    })
  })

  test('it should return the default state if the existing state is null', () => {
    // Given a null state
    // And an action we can't reduce

    // We expect the default state
    expect(reducer(null, missingAction)).toEqual({ foo: 'bar' })
  })

  test('it should return the existing state if the action is null', () => {
    // Given a null state
    // And an action that is undefined

    // We expect the default state
    expect(reducer(state, undefined)).toEqual({ foo: 'bar' })
  })
})
