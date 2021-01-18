export const initialState = {
  step: 1,
  submitting: false,
  siteSelector: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FORM_STEP_GO':
      return { ...state, step: payload }
    case 'SUBMIT_REQUEST_FORM':
      return { ...state, submitting: true }
    case 'SUBMIT_REQUEST_FORM_SUCCESS':
      return { ...state, submitting: false }
    case 'SITE_SELECTOR':
      return { ...state, siteSelector: payload }
    default:
      return { ...state }
  }
}
