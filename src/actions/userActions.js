import reserveApi from "../utils/axios";
import { setFlashMessage } from "../actions/flashActions";

export function userSettings() {
  return function(dispatch) {
    dispatch({ type: "FETCH_USER" });
    reserveApi({
      method: "get",
      url: "/users"
    })
      .then(function(response) {
        dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data });
      })
      .catch(function(error) {
        localStorage.setItem("token", null);
        dispatch({ type: "FETCH_USER_REJECTED", payload: error });
      });
  };
}

export function paymentSuccess(data) {
  return function(dispatch) {
    dispatch({ type: "SET_PREMIUM" });
    dispatch({ type: "PAYMENT" });
    dispatch(setFlashMessage("Payment Successful!!", "success"));
    let apiValues = {
      details: data
    };

    reserveApi({
      method: "post",
      url: "/payments",
      data: {
        payment: apiValues
      }
    })
      .then(function(response) {
        dispatch({ type: "PAYMENT_FULFILLED", payload: response.data });
      })
      .catch(function(error) {
        dispatch({ type: "PAYMENT_REJECTED", payload: error });
      });
  };
}
