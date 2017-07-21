import { merge } from "lodash";

const defaultConfig = require("../config/application.js");
const processEnv = process.env.NODE_ENV || "development";

function configLoader(env = processEnv) {
  let envConfig;
  if (env === "development") {
    envConfig = require("../config/development.js");
  } else if (env === "test") {
    // envConfig = require("../config/test.js");
    envConfig = require("../config/development.js");
  } else if (env === "production") {
    envConfig = require("../config/production.js");
  } else {
    throw new Error({ message: `NODE_ENV ${env} not found` });
  }

  const config = merge({ env }, defaultConfig, envConfig);
  return config;
}

export default configLoader();
export { configLoader };
