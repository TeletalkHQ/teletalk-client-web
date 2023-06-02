import { trier } from "simple-trier";
import { windowUtilities } from "~/classes/WindowUtilities";

import { apiManager } from "~/classes/api/ApiManager";
import { appConfigs } from "~/classes/AppConfigs";
import { componentController } from "~/classes/ComponentController";
import { envManager } from "~/classes/EnvironmentManager";
import { eventEmitter } from "~/classes/EventEmitter";
import { stuffStore } from "~/classes/StuffStore";
import { validatorManager } from "~/classes/validator/ValidatorManager";
import { websocket } from "~/classes/websocket/Websocket";
import { eventManager } from "~/classes/websocket/EventManager";

import { events } from "~/events";

import { actions } from "~/store/actions";
import { stateStatics } from "~/store/stateStatics";
import { commonActions } from "~/store/commonActions";

const initialSetup = () => async (dispatch) => {
  await trier(initialSetup.name)
    .tryAsync(tryBlock, dispatch, dispatch)
    .catch(catchBlock, dispatch)
    .finally(finallyBlock, dispatch)
    .runAsync();
};

const tryBlock = async (dispatch) => {
  events.addOnlineStatusEvents(dispatch);
  dispatch(commonActions.openGlobalLoading());

  addWindowProperties(dispatch);

  dispatch(commonActions.changeViewMode.checkCurrentUser());

  dispatch(
    actions.changeInitialSetupStatus({
      status: stateStatics.INITIAL_SETUP_STATUS.DONE,
    })
  );
};

const catchBlock = (_error, dispatch) => {
  dispatch(
    actions.changeInitialSetupStatus({
      status: stateStatics.INITIAL_SETUP_STATUS.FAILED,
    })
  );
};

const finallyBlock = (_, dispatch) =>
  dispatch(commonActions.closeGlobalLoading());

const addWindowProperties = (dispatch) => {
  windowUtilities
    .addProperty("actions", actions)
    .addProperty("apiManager", apiManager)
    .addProperty("appConfigs", appConfigs)
    .addProperty("componentController", componentController)
    .addProperty("dispatch", dispatch)
    .addProperty("envManager", envManager)
    .addProperty("eventEmitter", eventEmitter)
    .addProperty("eventManager", eventManager)
    .addProperty("stuffs", stuffStore.getStore())
    .addProperty("validatorManager", validatorManager)
    .addProperty("websocket", websocket);
};

export { initialSetup };
