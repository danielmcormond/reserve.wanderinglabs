import _ from 'lodash'
import { actions } from 'react-redux-form'
import { push } from 'connected-react-router'
import camelcaseKeys from 'camelcase-keys'

import { setFlashMessage } from '../actions/flashActions'

import reserveApi from '../utils/axios'
import store from '../store'

export function matchingSiteCount() {
  return function (dispatch) {
    const availabilityRequest = store.getState().availabilityRequestForm

    const apiValues = {
      facility_id: availabilityRequest.facilityId,
      date_start: availabilityRequest.dateStart,
      date_end: availabilityRequest.dateEnd,
      stay_length: availabilityRequest.stayLength,
      email: availabilityRequest.email,
      sewer: availabilityRequest.sewer,
      water: availabilityRequest.water,
      pullthru: availabilityRequest.pullthru,
      min_length: availabilityRequest.length,
      min_electric: availabilityRequest.electric,
      site_premium: availabilityRequest.sitePremium,
      ignore_ada: availabilityRequest.ignoreAda,
      site_type: availabilityRequest.type,
      specific_site_ids: availabilityRequest.specificSiteIds,
      arrival_days: availabilityRequest.arrivalDays
    }

    reserveApi({
      method: 'post',
      url: '/availability_requests/sites_count.json',
      data: {
        availability_request: apiValues
      }
    })
      .then(response => {
        dispatch({
          type: 'FETCH_AR_SITE_COUNT_FULFILLED',
          payload: camelcaseKeys(response.data, { deep: true })
        })
      })
      .catch(err => {
        dispatch({ type: 'SUBMIT_REQUEST_REJECTED', payload: err })
      })
  }
}

export function formSubmit() {
  return function (dispatch) {
    dispatch({ type: 'SUBMIT_REQUEST_FORM' })
    const availability_request = store.getState().availabilityRequestForm

    let apiValues = {
      facility_id: availability_request.facilityId,
      date_start: availability_request.dateStart,
      date_end: availability_request.dateEnd,
      stay_length: availability_request.stayLength,
      email: availability_request.email,
      sewer: availability_request.sewer,
      water: availability_request.water,
      pullthru: availability_request.pullthru,
      min_length: availability_request.length,
      min_electric: availability_request.electric,
      site_premium: availability_request.sitePremium,
      ignore_ada: availability_request.ignoreAda,
      site_type: availability_request.type,
      specific_site_ids: availability_request.specificSiteIds,
      arrival_days: availability_request.arrivalDays
    }
    reserveApi({
      method: 'post',
      url: '/availability_requests.json',
      data: {
        availability_request: apiValues
      }
    })
      .then(response => {
        dispatch({ type: 'SUBMIT_REQUEST_FORM_SUCCESS' })
        dispatch({ type: 'FETCH_AR_FULFILLED', payload: response.data })
        dispatch(formStepGo(1))
        dispatch({ type: 'ARS_RESET' })

        dispatch(push(`/${response.data.uuid}`))
        dispatch(setFlashMessage('Success!! We will email you if a site becomes available.', 'success'))
      })
      .catch(err => {
        dispatch({ type: 'SUBMIT_REQUEST_REJECTED', payload: err })
      })
  }
}

export function formUpdate() {
  return function (dispatch) {
    dispatch({ type: 'SUBMIT_REQUEST_FORM' })
    const availability_request = store.getState().availabilityRequestForm
    const uuid = store.getState().availabilityRequestForm.uuid

    let apiValues = {
      facility_id: availability_request.facilityId,
      date_start: availability_request.dateStart,
      date_end: availability_request.dateEnd,
      stay_length: availability_request.stayLength,
      sewer: availability_request.sewer,
      water: availability_request.water,
      pullthru: availability_request.pullthru,
      min_length: availability_request.length,
      min_electric: availability_request.electric,
      site_premium: availability_request.sitePremium,
      ignore_ada: availability_request.ignoreAda,
      site_type: availability_request.type,
      specific_site_ids: availability_request.specificSiteIds,
      arrival_days: availability_request.arrivalDays
    }
    reserveApi({
      method: 'put',
      url: `/availability_requests/${uuid}.json`,
      data: { availability_request: apiValues }
    })
      .then(response => {
        dispatch({ type: 'SUBMIT_REQUEST_FORM_SUCCESS' })
        dispatch({ type: 'FETCH_AR_FULFILLED', payload: response.data })
        dispatch(formStepGo(1))
        dispatch({ type: 'ARS_RESET' })

        dispatch(push(`/${response.data.uuid}`))
        dispatch(setFlashMessage('Request Updated!! We will email you if a site becomes available.', 'success'))
      })
      .catch(err => {
        dispatch({ type: 'SUBMIT_REQUEST_REJECTED', payload: err })
      })
  }
}

export function formStepInc() {
  return function (dispatch) {
    let current_step = store.getState().requestForm.step

    let newStep = current_step + 1
    dispatch(formStepGo(newStep > 4 ? 4 : newStep))
  }
}

export function formStepDec() {
  return function (dispatch) {
    let current_step = store.getState().requestForm.step

    let newStep = current_step - 1
    dispatch(formStepGo(newStep < 1 ? 1 : newStep))
  }
}

export function formStepGo(step) {
  return function (dispatch) {
    let current_step = store.getState().requestForm.step

    if (step > current_step) {
      dispatch(formStepValidate())
      let stepValid = store.getState().forms.availabilityRequestForm.$form.valid
      stepValid && dispatch({ type: 'FORM_STEP_GO', payload: step }) && dispatch(matchingSiteCount())
      stepValid && window.scrollTo(0, 0)
    } else {
      dispatch({ type: 'FORM_STEP_GO', payload: step })
      window.scrollTo(0, 0)
    }
  }
}

export function formSetFacility(facilityId) {
  return function (dispatch) {
    let facilities = store.getState().facilities.facilities
    let facility = _.find(facilities, { id: facilityId })
    dispatch(actions.change('availabilityRequestForm.facilityId', facilityId))
    dispatch(actions.change('availabilityRequestForm.facility', facility))
    dispatch(formStepValidate()) // Get rid of errors upon selection
  }
}

export function formSetFacility2() {
  return function (dispatch) {
    let facility = store.getState().facilities.facility
    dispatch(actions.change('availabilityRequestForm.facilityId', facility.id))
    dispatch(actions.change('availabilityRequestForm.facility', facility))
    dispatch(formStepValidate()) // Get rid of errors upon selection
  }
}

export function formStepValidate() {
  return function (dispatch) {
    let current_step = store.getState().requestForm.step

    if (current_step === 1) {
      dispatch(
        actions.validateFields('availabilityRequestForm', {
          facilityId: { required: val => val && val > 0 }
        })
      )
    } else if (current_step === 2) {
      dispatch(
        actions.validateFields('availabilityRequestForm', {
          dateStart: { required: val => val },
          stayLength: { required: val => val && val > 0 }
        })
      )

      const availabilityRequestForm = store.getState().availabilityRequestForm
      const isTypeOk = Object.keys(availabilityRequestForm.facility.sites_details.types).includes(
        availabilityRequestForm.type
      )

      if (!isTypeOk) {
        dispatch(
          actions.change(
            'availabilityRequestForm.type',
            Object.keys(availabilityRequestForm.facility.sites_details.types)[0]
          )
        )
      }
    }
  }
}

export function siteSelectorToggle() {
  return function (dispatch) {
    const siteSelector = store.getState().requestForm.siteSelector
    dispatch({ type: 'SITE_SELECTOR', payload: !siteSelector })
  }
}
