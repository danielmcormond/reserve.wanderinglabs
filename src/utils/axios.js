import axios from "axios";
import config from "./config";
import store from "../store";

var instance = axios.create({
  baseURL: config.reserveApiUrl
});

export const reserveApi = options => {
  let token = store.getState().session.token;
  console.log("GET TOKEN FROM STATE", token);
  Object.assign(options, {
    headers: {
      Authorization: token ? `Token token=${token}` : ""
    }
  });
  return instance(options);
};

export default reserveApi;
