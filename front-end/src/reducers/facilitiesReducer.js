export default function reducer(
  state = {
    facility: { name: 'Loading' },
    facilities: [],
    facilityLookup: "",
    search: true,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_FACILITY": {
      return { ...state, fetching: true };
    }
    case "FETCH_FACILITY_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_FACILITY_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        facility: action.payload
      };
    }
    case "FETCH_FACILITIES": {
      return { ...state, fetching: true };
    }
    case "FETCH_FACILITIES_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_FACILITIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        facilities: action.payload
      };
    }
    case "SET_FACILITY_LOOKUP": {
      return {
        ...state,
        search: false,
        facilityLookup: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
