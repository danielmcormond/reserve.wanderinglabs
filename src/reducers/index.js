import { combineReducers } from "redux"
import { combineForms } from 'react-redux-form';

import availabilityRequests from "./availabilityRequestsReducer"
import facilities from "./facilitiesReducer"

import requestForm from "./requestFormReducer"

const initialUserState = {
  firstName: '',
  lastName: ''
};

export default combineReducers({
  testForm: combineForms({ user: initialUserState, }, 'testForm'),
  availabilityRequests,
  facilities,
  requestForm
})
