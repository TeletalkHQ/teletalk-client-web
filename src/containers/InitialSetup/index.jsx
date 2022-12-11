import { useEffect } from "react";

import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { apiManager } from "src/classes/api/ApiManager";
import { appConfigs } from "src/classes/AppConfigs";
import { componentController } from "src/classes/ComponentController";
import { eventManager } from "src/classes/EventManager";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/ValidatorManager";

import { controllers } from "src/controllers";

import { events } from "src/events";

import { useMainContext } from "src/hooks/useMainContext";
import { useDispatch } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";
import { stateStatics } from "src/store/stateStatics";
import { commonActions } from "src/store/commonActions";

const InitialSetup = () => {
  const dispatch = useDispatch();

  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  useEffect(() => {
    events.addOnlineStatusEvents();

    setup();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setup = async () => {
    await dispatchAsync(controllers.getAllStuff());

    windowUtilities
      .addProperty("actions", actions)
      .addProperty("dispatch", dispatch)
      .addProperty("apiManager", apiManager)
      .addProperty("appConfigs", appConfigs)
      .addProperty("componentController", componentController)
      .addProperty("eventManager", eventManager)
      .addProperty("stuffs", stuffStore.getStore())
      .addProperty("validatorManager", validatorManager);

    dispatch(commonActions.changeViewMode.signIn());
    dispatch(
      actions.changeInitialSetupStatus({
        status: stateStatics.INITIAL_SETUP_STATUS.DONE,
      })
    );
  };

  return null;
};

export default InitialSetup;
