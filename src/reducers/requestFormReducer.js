
export default function reducer(state=1, action) {
  if (action.type === "FORM_STEP_INC") {
    let newStep = state + 1
    return newStep > 4 ? 4 : newStep;
  } else if (action.type === "FORM_STEP_DEC") {
    let newStep = state - 1
    return newStep < 1 ? 1 : newStep;
  } else if (action.type === "FORM_STEP_GO") {
    return action.payload;
  }
  return state;
}

