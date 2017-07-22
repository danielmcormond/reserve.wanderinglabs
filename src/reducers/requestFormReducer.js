export default function reducer(state = 3, action) {
  if (action.type === "FORM_STEP_GO") {
    return action.payload;
  }
  return state;
}
