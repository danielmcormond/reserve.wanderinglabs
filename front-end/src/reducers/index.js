import { combineReducers } from 'redux'
import { combineForms, createForms } from 'react-redux-form'

import { connectRouter } from 'connected-react-router'

import availabilityMatches from './availabilityMatchesReducer'
import availabilityRequests from './availabilityRequestsReducer'
import facilities from './facilitiesReducer'
import agency from './agencyReducer'
import notifications from './notificationsReducer'

import groupedAvailabilities from './groupedAvailabilitiesReducer'

import requestForm from './requestFormReducer'
import flash from './flashReducer'
import session from './sessionReducer'
import user from './userReducer'
import availabilityRequestForm from './availabilityRequestFormReducer'
import calendar from './calendarReducer'
import admin from './adminReducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    ...createForms({
      availabilityRequestForm: availabilityRequestForm
    }),
    sessionForm: combineForms({ user: { email: '' } }, 'sessionForm'),
    availabilityMatches,
    availabilityRequests,
    facilities,
    agency,
    flash,
    groupedAvailabilities,
    requestForm,
    session,
    user,
    notifications,
    calendar,
    admin
  })
