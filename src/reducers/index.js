import { combineReducers } from "redux"

import availabilityRequests from "./availabilityRequestsReducer"
import requestForm from "./requestFormReducer"

export default combineReducers({
  availabilityRequests,
  requestForm
})
