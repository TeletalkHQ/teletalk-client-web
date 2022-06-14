import { apiManager } from "classes/ApiManager";

import { stuffStore } from "classes/StuffStore";

const {
  createNewUserRoute,
  // getUserDataRoute,
  logoutNormalRoute,
  signInNormalRoute,
  statusCheckRoute,
  userRouteBaseUrl,
  verifySignInNormalRoute,
} = stuffStore;

const verifySignInApi = apiManager
  .create()
  .setRequirements(userRouteBaseUrl, verifySignInNormalRoute)
  .build();

const userStatusCheckerApi = apiManager
  .create()
  .setRequirements(userRouteBaseUrl, statusCheckRoute)
  .build();

const signInApi = apiManager
  .create()
  .setRequirements(userRouteBaseUrl, signInNormalRoute)
  .build();

const logoutApi = apiManager
  .create()
  .setRequirements(userRouteBaseUrl, logoutNormalRoute)
  .build();

const getCountriesApi = apiManager
  .create()
  .setRequirements(userRouteBaseUrl)
  .build();

const createNewUserApi = apiManager
  .create()
  .setRequirements(userRouteBaseUrl, createNewUserRoute)
  .build();

export {
  createNewUserApi,
  getCountriesApi,
  logoutApi,
  signInApi,
  userStatusCheckerApi,
  verifySignInApi,
};
