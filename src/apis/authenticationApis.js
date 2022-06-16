import { apiBuilder } from "classes/ApiBuilder";

import { stuffStore } from "classes/StuffStore";

const {
  createNewUserRoute,
  logoutNormalRoute,
  signInNormalRoute,
  statusCheckRoute,
  userRouteBaseUrl,
  verifySignInNormalRoute,
} = stuffStore.routes;

const verifySignInApi = apiBuilder
  .create()
  .setRequirements(userRouteBaseUrl, verifySignInNormalRoute)
  .build();

const userStatusCheckerApi = apiBuilder
  .create()
  .setRequirements(userRouteBaseUrl, statusCheckRoute)
  .build();

const signInApi = apiBuilder
  .create()
  .setRequirements(userRouteBaseUrl, signInNormalRoute)
  .build();

const logoutApi = apiBuilder
  .create()
  .setRequirements(userRouteBaseUrl, logoutNormalRoute)
  .build();

const createNewUserApi = apiBuilder
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
