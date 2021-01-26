export default function reducer(
  state = {
    active: []
  },
  action
) {
  switch (action.type) {
    case 'CALENDAR_FACILITY_FULFILLED': {
      return { ...state, active: state.active.concat(action.payload) }
    }
    default: {
      return state
    }
  }
}
