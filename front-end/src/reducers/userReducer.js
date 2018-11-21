export default function reducer(
  state = {
    user: {
      notification_methods: [],
      sms_limit: 0,
      sms_count: 0
    },
    premiumAmount: 20,
    premium: false,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "SET_PREMIUM": {
      return { ...state, premium: true };
    }
    case "SET_PREMIUM_AMOUNT": {
      return { ...state, premiumAmount: action.payload };
    }
    case "FETCH_USER": {
      return { ...state, fetching: true };
    }
    case "FETCH_USER_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload,
        premium: action.payload.premium
      };
    }
    default: {
      return { ...state };
    }
  }
}
