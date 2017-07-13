import { actions } from 'react-redux-form';
import axios from "axios";
import { push } from 'react-router-redux'
import { setFlashMessage } from '../actions/flashActions';

import store from '../store';

export function formSubmit(values) {
  return function(dispatch) {
    dispatch({type: "SUBMIT_REQUEST"});

    let apiValues = {
      facility_id: values.step1.facilityId,
      date_start: values.step2.dateStart,
      date_end: values.step2.dateEnd,
      stay_length: values.step2.stayLength,
      email: values.step4.email,
      sewer: values.step3.sewer
    }
    axios.post(`http://wl.dev/availability_requests.json`, { availability_request: apiValues })
      .then((response) => {
        dispatch({type: "FETCH_AR_FULFILLED", payload: response.data})
        dispatch(formStepGo(1))

        dispatch(push(`/${response.data.uuid}`));
        dispatch(setFlashMessage('Success!! We will email you if a site becomes available.', 'success'))
      })
      .catch((err) => {
        dispatch({type: "SUBMIT_REQUEST_REJECTED", payload: err})
      })
  }
}

export function formStepInc() {
  return function(dispatch) {
    let current_step = store.getState().requestForm;

    let newStep = current_step + 1;
    dispatch(formStepGo(newStep > 4 ? 4 : newStep))
  }
}

export function formStepDec() {
  return function(dispatch) {
    let current_step = store.getState().requestForm;

    let newStep = current_step - 1;
    dispatch(formStepGo(newStep < 1 ? 1 : newStep))
  }
}

export function formStepGo(step) {
  return function(dispatch) {
    let current_step = store.getState().requestForm;

    dispatch(formStepValidate())

    let stepValid = store.getState().availabilityRequestForm.forms[`step${current_step}`].$form.valid;
    stepValid && dispatch({type: "FORM_STEP_GO", payload: step});
  }
}


export function formStepValidate() {
  return function(dispatch) {
    let current_step = store.getState().requestForm;

    if (current_step === 1) {
      dispatch(actions.validateFields('availabilityRequestForm.step1',
        {
          facilityId: { required: (val) => (val && val > 0) }
        }
      ));
    } else if (current_step === 2) {

    }
  }
}
