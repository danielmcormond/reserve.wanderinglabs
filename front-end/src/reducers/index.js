import { combineReducers } from "redux";
import { combineForms } from "react-redux-form";

import { connectRouter } from 'connected-react-router'

import availabilityImports from "./availabilityImportsReducer";
import availabilityMatches from "./availabilityMatchesReducer";
import availabilityRequests from "./availabilityRequestsReducer";
import facilities from "./facilitiesReducer";
import sites from "./sitesReducer";
import groupedAvailabilities from "./groupedAvailabilitiesReducer";

import requestForm from "./requestFormReducer";
import flash from "./flashReducer";
import session from "./sessionReducer";
import user from "./userReducer";

const initialAvailabilityRequestFormState = {
  step1: {
    facility: {},
    facilityId: ""
  },
  step2: {
    dateStart: null,
    dateEnd: null,
    stayLength: "",
    arrivalDays: []
  },
  step3: {
    length: "",
    type: "rv",
    electric: "",
    water: false,
    sewer: false,
    pullthru: false,
    sitePremium: false,
    ignoreAda: false,
    sites: []
  },
  step4: {
    email: ""
  }
};

export default (history) => combineReducers({
  router: connectRouter(history),
  availabilityRequestForm: combineForms(
    initialAvailabilityRequestFormState,
    "availabilityRequestForm"
  ),
  sessionForm: combineForms({ user: { email: "" } }, "sessionForm"),
  availabilityImports,
  availabilityMatches,
  availabilityRequests,
  facilities,
  flash,
  groupedAvailabilities,
  requestForm,
  session,
  sites,
  user
});
