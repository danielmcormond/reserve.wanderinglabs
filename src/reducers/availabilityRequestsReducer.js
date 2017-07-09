export default function reducer(state={
    ars: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_AR": {
        return {...state, fetching: true}
      }
      case "FETCH_AR_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_AR_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          ars: action.payload,
        }
      }
      default: {
        return state;
      }
    }
}
