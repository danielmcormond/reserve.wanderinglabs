import axios from "axios";
import config from "./config";
import store from "../store";

axios.interceptors.request.use(axiosConfig => {
  const token = store.getState().session.token;

  axiosConfig.baseURL = config.reserveApiUrl
  axiosConfig.headers.Authorization = token ? `Token token=${token}` : ""
  return axiosConfig
})

export default axios;
export const getDefaultAdapter = () => axios.defaults.adapter;

// var instance = axios.create({
//   baseURL: config.reserveApiUrl
// });

// export const reserveApi = options => {
//   let token = store.getState().session.token;
//   Object.assign(options, {
//     headers: {
//       Authorization: token ? `Token token=${token}` : ""
//     }
//   });
//   return instance(options);
// };

// export default reserveApi;

// export const getDefaultAdapter = () => axios.defaults.adapter;
