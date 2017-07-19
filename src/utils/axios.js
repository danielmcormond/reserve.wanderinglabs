import axios from "axios";
import config from "./config";
import store from "../store";

let token = store.getState().session.token;

var instance = axios.create({
  baseURL: config.reserveApiUrl,
  headers: {
    Authorization: token ? `Token token=${token}` : ""
  }
});

export const reserveApi = options => {
  return instance(options);
};

export default reserveApi;
