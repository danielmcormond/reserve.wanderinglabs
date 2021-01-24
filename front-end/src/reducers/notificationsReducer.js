export default function reducer(
  state = {
    notifications: [],
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case 'FETCH_NOTIFICATION': {
      return { ...state, fetching: true }
    }
    case 'FETCH_NOTIFICATION_REJECTED': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'FETCH_NOTIFICATION_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        notification: action.payload
      }
    }
    case 'FETCH_NOTIFICATIONS': {
      return { ...state, fetching: true }
    }
    case 'FETCH_NOTIFICATIONS_REJECTED': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'FETCH_NOTIFICATIONS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        notifications: action.payload
      }
    }
    default: {
      return state
    }
  }
}
