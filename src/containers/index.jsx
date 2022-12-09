import { useEffect, useState } from "react";

import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "src/classes/AppConfigs";
import { eventManager } from "src/classes/EventManager";
import { apiManager } from "src/classes/api/ApiManager";
import { validatorManager } from "src/classes/ValidatorManager";
import { stuffStore } from "src/classes/StuffStore";

import Root from "src/containers/Root";
import InitialSetup from "src/containers/InitialSetup";
import Auth from "src/containers/auth";
import Dialog from "src/containers/dialog";
import LeftSide from "src/containers/leftSide";
import Portal from "src/containers/portal";
import RightSide from "src/containers/rightSide";

import { controllers } from "src/controllers";

import { events } from "src/events/index";

import { useMainContext } from "src/hooks/useMainContext";
import { useSelector } from "src/hooks/useThunkReducer";

import { stateStatics } from "src/store/stateStatics";
import { componentController } from "src/classes/ComponentController";

const Provider = () => {
  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();
  const state = useSelector();

  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const forceUpdater = () => {
      setForceUpdate(!forceUpdate);
    };
    windowUtilities
      .addProperty("apiManager", apiManager)
      .addProperty("appConfigs", appConfigs)
      .addProperty("componentController", componentController)
      .addProperty("eventManager", eventManager)
      .addProperty("forceUpdater", forceUpdater)
      .addProperty("state", state)
      .addProperty("stuffs", stuffStore.getStore())
      .addProperty("validatorManager", validatorManager);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    events.addOnlineStatusEvents();

    const fn = async () => {
      await dispatchAsync(controllers.getAllStuff());
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {state.global.initialSetupDetails.status !==
      stateStatics.INITIAL_SETUP_STATUS.DONE ? (
        <InitialSetup />
      ) : (
        <Root />
      )}
    </>
  );
};

const Containers = {
  Auth,
  Dialog,
  InitialSetup,
  LeftSide,
  Portal,
  Provider,
  RightSide,
  Root,
};

export default Containers;
