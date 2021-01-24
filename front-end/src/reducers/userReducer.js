export const initialState = {
  user: {
    notification_methods: [],
    sms_limit: 0,
    sms_count: 0
  },
  premiumAmount: 20,
  premium: false,
  fetching: false,
  fetched: false,
  error: null,
  notificationLoading: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_PREMIUM": {
      return { ...state, premium: true };
    }
    case "SET_PREMIUM_AMOUNT": {
      return { ...state, premiumAmount: payload };
    }
    case "FETCH_USER": {
      return { ...state, fetching: true };
    }
    case "FETCH_USER_REJECTED": {
      return { ...state, fetching: false, error: payload };
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: payload,
        premium: payload.premium
      };
    }
    case 'NOTIFICATION_LOADING': {
      return { ...state, notificationLoading: payload };
    }
    default: {
      return { ...state };
    }
  }
}
