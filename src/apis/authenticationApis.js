import { apiBuilder } from "classes/Builders/ApiBuilder";
import { stuffStore } from "classes/StuffStore";

const {
  createNewUserRoute,
  logoutNormalRoute,
  signInNormalRoute,
  statusCheckRoute,
  verifySignInNormalRoute,
} = stuffStore.routes;

const verifySignInApi = apiBuilder
  .create()
  .setRequirements(verifySignInNormalRoute)
  .build();

const userStatusCheckerApi = apiBuilder
  .create()
  .setRequirements(statusCheckRoute)
  .build();

const signInApi = apiBuilder
  .create()
  .setRequirements(signInNormalRoute)
  .build();

const logoutApi = apiBuilder
  .create()
  .setRequirements(logoutNormalRoute)
  .build();

const createNewUserApi = apiBuilder
  .create()
  .setRequirements(createNewUserRoute)
  .build();

export {
  createNewUserApi,
  logoutApi,
  signInApi,
  userStatusCheckerApi,
  verifySignInApi,
};
