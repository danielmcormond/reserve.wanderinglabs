import { actions } from 'react-redux-form';
import store from '../store';


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
