import { useEffect, useState } from "react";

import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "classes/AppConfigs";
import { eventManager } from "classes/EventManager";

import Root from "containers/Root";
import InitialSetup from "containers/InitialSetup";
import Auth from "containers/auth";
import Dialog from "containers/dialog";
import LeftSide from "containers/leftSide";
import Portal from "containers/portal";
import RightSide from "containers/rightSide";

import { controllers } from "controllers";

import { events } from "events/index";

import { useMainContext } from "hooks/useMainContext";

import { stateStatics } from "store/stateStatics";
import { apiManager } from "classes/api/ApiManager";
import { validatorManager } from "classes/ValidatorManager";
import { stuffStore } from "classes/StuffStore";

const Provider = () => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const forceUpdater = () => {
      setForceUpdate(!forceUpdate);
    };
    windowUtilities
      .addProperty("apiManager", apiManager)
      .addProperty("appConfigs", appConfigs)
      .addProperty("eventManager", eventManager)
      .addProperty("forceUpdater", forceUpdater)
      .addProperty("state", state)
      .addProperty("stuffs", stuffStore.getStore())
      .addProperty("validatorManager", validatorManager);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    events.addOnlineStatusEvents();
    dispatch(controllers.getAllStuff());

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
