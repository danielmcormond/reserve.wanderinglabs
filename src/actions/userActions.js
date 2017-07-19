import reserveApi from "../utils/axios";

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
