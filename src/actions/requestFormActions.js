export function formStepInc() {
  return {type: "FORM_STEP_INC"}
}

export function formStepDec() {
  return {type: "FORM_STEP_DEC"}
}

export function formStepGo(step) {
  return {type: "FORM_STEP_GO", payload: step}
}
