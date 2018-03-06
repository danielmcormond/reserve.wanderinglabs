export default function reducer(
  state = {
    ars: [],
    ar: {
      facility: {},
      status: ""
    },
    matchingSiteCount: 0,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_ARS": {
      return { ...state, fetching: true };
    }
    case "FETCH_ARS_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      };
    }
    case "FETCH_ARS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        ars: action.payload
      };
    }
    case "ARS_RESET": {
      return { ...state, fetching: false, fetched: false, ars: [] };
    }
    case "FETCH_AR": {
      return { ...state, fetching: true };
    }
    case "FETCH_AR_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_AR_FULFILLED": {
      return {
        ...state,
        fetching: false,
        ar: action.payload
      };
    }
    case "FETCH_AR_SITE_COUNT_FULFILLED": {
      return { ...state, matchingSiteCount: action.payload };
    }
    default: {
      return state;
    }
  }
}
