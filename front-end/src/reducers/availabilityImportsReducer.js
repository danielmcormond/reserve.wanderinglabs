export default function reducer(
  state = {
    imports: [],
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_IMPORTS": {
      return { ...state, fetching: true };
    }
    case "FETCH_IMPORTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      };
    }
    case "FETCH_IMPORTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        imports: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
