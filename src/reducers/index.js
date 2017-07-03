import { combineReducers } from "redux"
import { combineForms } from 'react-redux-form';

import { routerReducer } from 'react-router-redux'

import availabilityRequests from "./availabilityRequestsReducer"
import facilities from "./facilitiesReducer"

import requestForm from "./requestFormReducer"
import flash from "./flashReducer"
import session from "./sessionReducer"
import user from "./userReducer"


const initialUserState = {
  firstName: '',
  lastName: ''
};

export default combineReducers({
  router: routerReducer,
  testForm: combineForms({ user: initialUserState, }, 'testForm'),
  sessionForm: combineForms({ user: { email: '' }, }, 'sessionForm'),
  availabilityRequests,
  facilities,
  flash,
  requestForm,
  session,
  user
})
