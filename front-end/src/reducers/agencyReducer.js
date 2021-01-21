export default function reducer(
  state = {
    agency: { name: 'Loading' },
    agencies: [],
    agencyLookup: "",
    search: true,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_AGENCY": {
      return { ...state, fetching: true };
    }
    case "FETCH_AGENCY_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_AGENCY_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        agency: action.payload
      };
    }
    case "FETCH_AGENCIES": {
      return { ...state, fetching: true };
    }
    case "FETCH_AGENCIES_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_AGENCIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        agencies: action.payload
      };
    }
    case "SET_AGENCY_LOOKUP": {
      return {
        ...state,
        search: false,
        agencyLookup: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
