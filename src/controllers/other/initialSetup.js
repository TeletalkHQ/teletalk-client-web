import { trier } from "utility-store/src/classes/Trier";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { apiManager } from "src/classes/api/ApiManager";
import { appConfigs } from "src/classes/AppConfigs";
import { componentController } from "src/classes/ComponentController";
import { envManager } from "src/classes/EnvironmentManager";
import { eventEmitter } from "src/classes/EventEmitter";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/validator/ValidatorManager";

import { events } from "src/events";

import { actions } from "src/store/actions";
import { stateStatics } from "src/store/stateStatics";
import { commonActions } from "src/store/commonActions";

const initialSetup = () => async (dispatch) => {
  await trier(initialSetup.name)
    .tryAsync(tryBlock, dispatch, dispatch)
    .catch(catchBlock, dispatch)
    .finally(finallyBlock, dispatch)
    .runAsync();
};

const tryBlock = async (dispatch) => {
  events.addOnlineStatusEvents();
  dispatch(commonActions.openGlobalLoading());

  addWindowProperties(dispatch);

  dispatch(commonActions.changeViewMode.auth());

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
    .addProperty("stuffs", stuffStore.getStore())
    .addProperty("validatorManager", validatorManager);
};

export { initialSetup };
