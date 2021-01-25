export default function reducer(
  state = {
    matches: [],
    match: {
      reserve: {
        post: {}
      },
      site: {
        site_num: null
      },
      id: null
    },
    fetching: false,
    fetched: false,
    error: null,
    matchesCalendar: []
  },
  action
) {
  switch (action.type) {
    case "FETCH_MATCHES": {
      return { ...state, matches: [], fetching: true };
    }
    case "FETCH_MATCHES_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_MATCHES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        matches: action.payload
      };
    }
    case "FETCH_MATCHES_CALENDAR_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        matchesCalendar: action.payload
      };
    }
    case "FETCH_MATCH": {
      return { ...state, fetching: true };
    }
    case "FETCH_MATCH_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_MATCH_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        match: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
