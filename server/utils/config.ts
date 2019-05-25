import config from "../config";

export const getConfig = function() {
  return config[getEnvironment()];
};
export const getEnvironment = function() {
  return process.env.NODE_ENV || "development";
};

export const getMongoDb = function() {
  return config[getEnvironment()].mongodb;
};
