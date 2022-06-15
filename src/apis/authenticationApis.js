import { apiManager } from "classes/ApiManager";

import { stuffStore } from "classes/StuffStore";

const {
  createNewUserRoute,
  logoutNormalRoute,
  signInNormalRoute,
  statusCheckRoute,
  userRouteBaseUrl,
  verifySignInNormalRoute,
} = stuffStore.routes;

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

const createNewUserApi = apiManager
  .create()
  .setRequirements(userRouteBaseUrl, createNewUserRoute)
  .build();

export {
  createNewUserApi,
  logoutApi,
  signInApi,
  userStatusCheckerApi,
  verifySignInApi,
};
