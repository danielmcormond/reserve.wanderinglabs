import { merge } from "lodash";

const defaultConfig = require("../config/application.js");
const processEnv = process.env.NODE_ENV || "development";

function configLoader(env = processEnv) {
  let envConfig;
  console.log('here again...', env)
  if (env === "development") {
    envConfig = require("../config/development.js");
  } else if (env === "test") {
    // envConfig = require("../config/test.js");
    envConfig = require("../config/development.js");
  } else if (env === "production") {
    console.log('yes production')
    envConfig = require("../config/production.js");
  } else {
    throw new Error({ message: `NODE_ENV ${env} not found` });
  }

  console.log('config...envConfig', envConfig)
  const config = merge({ env }, defaultConfig, envConfig);
  console.log('config...', config)
  return config;
}

export default configLoader();
export { configLoader };
