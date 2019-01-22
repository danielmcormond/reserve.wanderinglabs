import _ from "lodash";
import { actions } from "react-redux-form";
import { push } from "connected-react-router";
import { setFlashMessage } from "../actions/flashActions";

import reserveApi from "../utils/axios";
import store from "../store";

export function matchingSiteCount(values) {
  return function(dispatch) {
    let currentStep = store.getState().requestForm.step;
    if (currentStep !== 3) {
      return;
    }

    let apiValues = {
      facility_id: values.step1.facilityId,
      date_start: values.step2.dateStart,
      date_end: values.step2.dateEnd,
      stay_length: values.step2.stayLength,
      email: values.step4.email,
      sewer: values.step3.sewer,
      water: values.step3.water,
      pullthru: values.step3.pullthru,
      min_length: values.step3.length,
      min_electric: values.step3.electric,
      site_premium: values.step3.sitePremium,
      ignore_ada: values.step2.ignoreAda,
      site_type: values.step3.type,
      specific_site_ids: values.step3.siteIds,
      arrival_days: values.step2.arrivalDays
    };
    reserveApi({
      method: "post",
      url: "/availability_requests/sites_count.json",
      data: {
        availability_request: apiValues
      }
    })
      .then(response => {
        dispatch({
          type: "FETCH_AR_SITE_COUNT_FULFILLED",
          payload: response.data.count
        });
      })
      .catch(err => {
        dispatch({ type: "SUBMIT_REQUEST_REJECTED", payload: err });
      });
  };
}

export function formSubmit(values) {
  return function(dispatch) {
    dispatch({ type: "SUBMIT_REQUEST_FORM" });

    let apiValues = {
      facility_id: values.step1.facilityId,
      date_start: values.step2.dateStart,
      date_end: values.step2.dateEnd,
      stay_length: values.step2.stayLength,
      email: values.step4.email,
      sewer: values.step3.sewer,
      water: values.step3.water,
      pullthru: values.step3.pullthru,
      min_length: values.step3.length,
      min_electric: values.step3.electric,
      site_premium: values.step3.sitePremium,
      ignore_ada: values.step2.ignoreAda,
      site_type: values.step3.type,
      specific_site_ids: values.step3.siteIds,
      arrival_days: values.step2.arrivalDays
    };
    reserveApi({
      method: "post",
      url: "/availability_requests.json",
      data: {
        availability_request: apiValues
      }
    })
      .then(response => {
        dispatch({ type: "SUBMIT_REQUEST_FORM_SUCCESS" });
        dispatch({ type: "FETCH_AR_FULFILLED", payload: response.data });
        dispatch(formStepGo(1));
        dispatch({ type: "ARS_RESET" });

        dispatch(push(`/${response.data.uuid}`));
        dispatch(
          setFlashMessage(
            "Success!! We will email you if a site becomes available.",
            "success"
          )
        );
      })
      .catch(err => {
        dispatch({ type: "SUBMIT_REQUEST_REJECTED", payload: err });
      });
  };
}

export function formStepInc() {
  return function(dispatch) {
    let current_step = store.getState().requestForm.step;

    let newStep = current_step + 1;
    dispatch(formStepGo(newStep > 4 ? 4 : newStep));
  };
}

export function formStepDec() {
  return function(dispatch) {
    let current_step = store.getState().requestForm.step;

    let newStep = current_step - 1;
    dispatch(formStepGo(newStep < 1 ? 1 : newStep));
  };
}

export function formStepGo(step) {
  return function(dispatch) {
    let current_step = store.getState().requestForm.step;

    if (step > current_step) {
      dispatch(formStepValidate());
      let stepValid = store.getState().availabilityRequestForm.forms[
        `step${current_step}`
      ].$form.valid;
      stepValid && dispatch({ type: "FORM_STEP_GO", payload: step });
      stepValid && window.scrollTo(0, 0);
    } else {
      dispatch({ type: "FORM_STEP_GO", payload: step });
      window.scrollTo(0, 0);
    }
  };
}

export function formSetFacility(facilityId) {
  return function(dispatch) {
    let facilities = store.getState().facilities.facilities;
    let facility = _.find(facilities, { id: facilityId });
    dispatch(
      actions.change("availabilityRequestForm.step1.facilityId", facilityId)
    );
    dispatch(
      actions.change("availabilityRequestForm.step1.facility", facility)
    );
    dispatch(formStepValidate()); // Get rid of errors upon selection
  };
}

export function formStepValidate() {
  return function(dispatch) {
    let current_step = store.getState().requestForm.step;

    if (current_step === 1) {
      dispatch(
        actions.validateFields("availabilityRequestForm.step1", {
          facilityId: { required: val => val && val > 0 }
        })
      );
    } else if (current_step === 2) {
      dispatch(
        actions.validateFields("availabilityRequestForm.step2", {
          dateStart: { required: val => val },
          stayLength: { required: val => val && val > 0 }
        })
      );
    }
  };
}
