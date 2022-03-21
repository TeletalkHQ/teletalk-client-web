import { actionCreator } from "~/Functions/Utils/actionCreator";

import {
  globalInitialActions,
  userInitialActions,
} from "~/Variables/Constants/Initials/InitialActions/initialActions";

const { userInitialAction } = userInitialActions;

const { loadingInitialAction } = globalInitialActions;

const loadingAction = (payload = loadingInitialAction.payload) =>
  actionCreator(loadingInitialAction.type, payload);

const userAction = (payload = userInitialAction.payload) =>
  actionCreator(userInitialAction.type, payload);

export { loadingAction, userAction };
