import { useEffect } from "react";

import { globalActions } from "actions/globalActions";

import { appOptions } from "classes/AppOptions";
import { eventManager } from "classes/EventManager";
import { persistentStorage } from "classes/PersistentStorage";

import Authentication from "components/authentication/Authentication";
import LeftSideContainer from "components/leftSideComponents/LeftSideContainer";
import PortalContainer from "components/portal/PortalContainer";
import RightSideContainer from "components/rightSideComponents/RightSideContainer";
import GridContainer from "components/generals/boxes/GridContainer";

import { getAllStuffController } from "controllers/versionControlControllers/getAllStuffController";

import { addOnlineStatusEvents } from "events/onlineConnectionsChecker";
import {
  allStuffReceivedListener,
  updateUserStatusAndChatsListener,
} from "events/eventListeners";

import { printCatchError } from "functions/utilities/otherUtilities";

import { useMainContext } from "hooks/useMainContext";

import {
  PERSISTENT_STORAGE_KEYS,
  VIEW_MODES,
} from "variables/otherVariables/constants";

const MainContainer = () => {
  const {
    state: {
      userState,
      globalState: { viewMode },
    },
    hooksOutput: { dispatch, dispatchAsync },
  } = useMainContext();

  const mainToken = persistentStorage.getItem(
    PERSISTENT_STORAGE_KEYS.MAIN_TOKEN
  );

  useEffect(() => {
    addOnlineStatusEvents();

    const {
      EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
    } = appOptions.getOptions();

    eventManager.addListener(ALL_STUFF_RECEIVED, allStuffReceivedListener);

    return () => {
      eventManager.removeAllListener(ALL_STUFF_RECEIVED);
    };
  }, []);

  useEffect(() => {
    const updateUserThingsOnTokenChange = async () => {
      try {
        if (!mainToken) return;

        const {
          EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
        } = appOptions.getOptions();

        eventManager.addListener(ALL_STUFF_RECEIVED, () =>
          updateUserStatusAndChatsListener(userState.privateId)
        );

        await dispatchAsync(getAllStuffController());
      } catch (error) {
        printCatchError(updateUserThingsOnTokenChange.name, error);
      } finally {
        dispatch(
          globalActions.globalLoadingStateOpenChangeAction({ open: false })
        );
      }
    };

    updateUserThingsOnTokenChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainToken]);

  const { NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN } = VIEW_MODES;
  const authenticationViewModes = [NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN];

  return (
    <>
      {authenticationViewModes.includes(viewMode) ? (
        <Authentication />
      ) : (
        <>
          <GridContainer style={{ height: "100vh" }}>
            <LeftSideContainer />
            <RightSideContainer />
          </GridContainer>
        </>
      )}
      <PortalContainer />
    </>
  );
};

export default MainContainer;
