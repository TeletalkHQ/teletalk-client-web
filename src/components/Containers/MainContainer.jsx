import { useEffect } from "react";

import { appOptions } from "classes/AppOptions";
import { eventManager } from "classes/EventManager";

import Authentication from "components/authentication/Authentication";
import PortalContainer from "components/portal/PortalContainer";
import FullPageLoading from "components/portal/FullPageLoading";
import MessengerContainer from "components/Containers/MessengerContainer";

import { getAllStuffController } from "controllers/versionControlControllers/getAllStuffController";

import { addOnlineStatusEvents } from "events/onlineConnectionsChecker";
import { thingsToDoAfterAllStuffReceived } from "events/eventListeners";

import { updateWindowStateAndConfigs } from "functions/helpers/otherHelpers";

import { useMainContext } from "hooks/useMainContext";

import { VIEW_MODES } from "variables/otherVariables/constants";
import { userStatusCheckerController } from "controllers/authControllers/userStatusCheckerController";

const visibleComponent = (viewMode, globalLoadingState) => {
  const { MESSENGER, NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN, LOADING } =
    VIEW_MODES;
  const authenticationViewModes = [NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN];

  if (authenticationViewModes.includes(viewMode)) return <Authentication />;

  if (viewMode === MESSENGER) return <MessengerContainer />;

  if (viewMode === LOADING)
    return <FullPageLoading globalLoadingState={globalLoadingState} />;

  return null;
};

const MainContainer = () => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const {
    globalState: { viewMode, globalLoadingState },
  } = state;

  useEffect(() => updateWindowStateAndConfigs(state), [state]);
  useEffect(() => {
    const {
      EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
    } = appOptions.getOptions();

    addOnlineStatusEvents();

    dispatch(getAllStuffController());

    eventManager.addListener(ALL_STUFF_RECEIVED, () => {
      thingsToDoAfterAllStuffReceived();

      dispatch(userStatusCheckerController());
    });

    return () => {
      eventManager.removeAllListener(ALL_STUFF_RECEIVED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {visibleComponent(viewMode, globalLoadingState)}
      <PortalContainer />
    </>
  );
};

export default MainContainer;
