export default function reducer(
  state = {
    availabilityRequestStats: {}
  },
  action
) {
  switch (action.type) {
    case 'FETCH_ADMIN_AVAILABILITY_REQUEST_STATS_FULFILLED': {
      return { ...state, availabilityRequestStats: action.payload }
    }
    default: {
      return state
    }
  }
}
