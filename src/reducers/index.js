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
  length: '45',
  type: '',
  electric: '30 amp',
  water: false,
  sewer: false,
  email: '',
};

export default combineReducers({
  router: routerReducer,
  testForm: combineForms(initialUserState, 'testForm'),
  sessionForm: combineForms({ user: { email: '' }, }, 'sessionForm'),
  availabilityRequests,
  facilities,
  flash,
  requestForm,
  session,
  user
})
