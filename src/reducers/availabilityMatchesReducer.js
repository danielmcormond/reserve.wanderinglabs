export default function reducer(state={
    matches: [],
    match: {},
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_MATCHES": {
        return {...state, matches: [], fetching: true}
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
      case "FETCH_MATCH": {
        return {...state, match: {}, fetching: true}
      }
      case "FETCH_MATCH_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_MATCH_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          match: action.payload,
        }
      }
      default: {
        return state;
      }
    }
}
