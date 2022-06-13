import { actionCreator } from "~/functions/utils/actionCreator";

import {
  globalInitialActions,
  userInitialActions,
} from "~/variables/constants/initials/initialActions/initialActions";

const { userInitialAction } = userInitialActions;

const { loadingInitialAction } = globalInitialActions;

const loadingAction = (payload = loadingInitialAction.payload) =>
  actionCreator(loadingInitialAction.type, payload);

const userAction = (payload = userInitialAction.payload) =>
  actionCreator(userInitialAction.type, payload);

export { loadingAction, userAction };
