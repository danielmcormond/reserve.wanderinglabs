import { combineReducers } from "redux";
import { combineForms, createForms } from "react-redux-form";

import { connectRouter } from 'connected-react-router'

import availabilityMatches from "./availabilityMatchesReducer";
import availabilityRequests from "./availabilityRequestsReducer";
import facilities from "./facilitiesReducer";
import groupedAvailabilities from "./groupedAvailabilitiesReducer";

import requestForm from "./requestFormReducer";
import flash from "./flashReducer";
import session from "./sessionReducer";
import user from "./userReducer";
import availabilityRequestForm from "./availabilityRequestFormReducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  ...createForms({
    availabilityRequestForm: availabilityRequestForm
  }),
  sessionForm: combineForms({ user: { email: "" } }, "sessionForm"),
  availabilityMatches,
  availabilityRequests,
  facilities,
  flash,
  groupedAvailabilities,
  requestForm,
  session,
  user
});
