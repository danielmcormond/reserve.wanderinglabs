import axios from "axios";
import store from "../store";

export function userSettings() {
  return function(dispatch) {
    let token = store.getState().session.token;
    axios.defaults.headers.common["Authorization"] = `Token token=${token}`;

    dispatch({ type: "FETCH_USER" });
    axios
      .get("http://wl.dev/users")
      .then(function(response) {
        dispatch({ type: "FETCH_USER_FULFILLED", payload: response.data });
      })
      .catch(function(error) {
        localStorage.setItem("token", null);
        dispatch({ type: "FETCH_USER_REJECTED", payload: error });
      });
  };
}
