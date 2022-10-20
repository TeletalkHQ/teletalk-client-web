import { useEffect } from "react";

import { eventManager } from "utility-store/src/classes/EventManager";

import { appOptions } from "classes/AppOptions";

import Authentication from "components/authentication/Authentication";
import FullPageLoading from "components/portal/FullPageLoading";
import MessengerContainer from "components/containers/MessengerContainer";
import PortalContainer from "components/portal/PortalContainer";

import { controllers } from "controllers/controllers";

import { addOnlineStatusEvents } from "events/onlineConnectionsChecker";
import { thingsToDoAfterAllStuffReceived } from "events/eventListeners";

import { updateWindowCustomProperties } from "functions/others/otherFunctions";

import { useMainContext } from "hooks/useMainContext";

import { VIEW_MODES } from "variables/otherVariables/helpers";

const visibleComponent = (viewMode, loading) => {
  const { MESSENGER, NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN, LOADING } =
    VIEW_MODES;
  const authenticationViewModes = [NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN];

  if (authenticationViewModes.includes(viewMode)) return <Authentication />;

  if (viewMode === MESSENGER) return <MessengerContainer />;

  if (viewMode === LOADING) return <FullPageLoading loading={loading} />;

  return null;
};

const MainContainer = () => {
  const {
    hooksOutput: { dispatch, dispatchAsync },
    state,
  } = useMainContext();

  const {
    global: { viewMode, loading },
  } = state;

  useEffect(() => updateWindowCustomProperties(state), [state]);
  useEffect(() => {
    const {
      EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
    } = appOptions.getOptions();

    eventManager.addListener(ALL_STUFF_RECEIVED, async () => {
      thingsToDoAfterAllStuffReceived();
      await dispatchAsync(controllers.userStatusChecker());
      //FIXME: Its unsafe to do it after userStatusCheckerController;
      dispatch(controllers.getCountries());
    });

    addOnlineStatusEvents();
    dispatch(controllers.getAllStuff());

    return () => {
      eventManager.removeAllListener(ALL_STUFF_RECEIVED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {visibleComponent(viewMode, loading)}
      <PortalContainer />
    </>
  );
};

export default MainContainer;
