import { trier } from "simple-trier";

import { appConfigs } from "~/classes/AppConfigs";
import { envManager } from "~/classes/EnvironmentManager";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import { websocket } from "~/classes/websocket/Websocket";
import { events } from "~/events";
import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";
import { stateStatics } from "~/store/stateStatics";

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

  addWindowProperties();

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

const addWindowProperties = () => {
  window.appConfigs = appConfigs;
  window.envManager = envManager;
  window.socketEmitterStore = socketEmitterStore;
  window.websocket = websocket;
};

export { initialSetup };
