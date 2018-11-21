export default function reducer(
  state = {
    avails: [],
    fetching: false,
    fetched: false,
    error: null,
    filterSiteType: null,
    sort: "avail_min",
    sortDirection: "ascending"
  },
  action
) {
  switch (action.type) {
    case "GROUP_AVAILS_FILTER_SITE_TYPE": {
      return { ...state, filterSiteType: action.payload };
    }
    case "GROUP_AVAILS_SORT": {
      return {
        ...state,
        sort: action.payload,
        sortDirection:
          state.sortDirection === "ascending" ? "descending" : "ascending"
      };
    }
    case "FETCH_GROUP_AVAILS": {
      return { ...state, fetching: true };
    }
    case "FETCH_GROUP_AVAILS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_GROUP_AVAILS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        avails: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
