export default function reducer(state={
    matches: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_MATCHES": {
        return {...state, fetching: true}
      }
      case "FETCH_MATCHES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_MATCHES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          matches: action.payload,
        }
      }
      default: {
        return state;
      }
    }
}
