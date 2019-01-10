import sessionReducer, { initialState } from "./sessionReducer";

describe("sessionReducer", () => {
  it('sets the default state', () => {
    const state = sessionReducer(undefined, {})
    expect(state).toEqual(initialState)
  })

  it('sets state based on args and payload', () => {
    const token = 'reducerToken';
    const action = {
      type: 'SESSION_SUCCESS',
      payload: { token }
    }
    const state = sessionReducer(undefined, action)
    expect(state).toHaveProperty('token', token)
    expect(state).toHaveProperty('isAuthenticated', true)
  })
})
