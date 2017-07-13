import { combineReducers } from "redux"
import { combineForms } from 'react-redux-form';

import { routerReducer } from 'react-router-redux'

import availabilityMatches from "./availabilityMatchesReducer"
import availabilityRequests from "./availabilityRequestsReducer"
import facilities from "./facilitiesReducer"

import requestForm from "./requestFormReducer"
import flash from "./flashReducer"
import session from "./sessionReducer"
import user from "./userReducer"


const initialAvailabilityRequestFormState = {
  step1: {
    facilityId: '',
  },
  step2: {
    dateStart: null,
    dateEnd: null,
    stayLength: '',
  },
  step3: {
    length: '45',
    type: '',
    electric: '30 amp',
    water: false,
    sewer: false,
  },
  step4: {
    email: '',
  },

};

export default combineReducers({
  router: routerReducer,
  availabilityRequestForm: combineForms(initialAvailabilityRequestFormState, 'availabilityRequestForm'),
  sessionForm: combineForms({ user: { email: '' }, }, 'sessionForm'),
  availabilityMatches,
  availabilityRequests,
  facilities,
  flash,
  requestForm,
  session,
  user
})
