export const initialState = {
  token: null,
  email: null,
  isAuthenticated: false,
  isAuthenticating: false,
};

export default (state=initialState, action) => {
  switch(action.type){
    case 'SESSION_SUCCESS':
      return {...state, token: action.payload.token, isAuthenticated: !!action.payload.token};
    default:
      return {...state};
  }
};
