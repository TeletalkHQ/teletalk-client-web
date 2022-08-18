import { useEffect } from "react";

import { Grid } from "@mui/material";

import { globalActions } from "actions/globalActions";

import { appOptions } from "classes/AppOptions";
import { eventManager } from "classes/EventManager";
import { persistentStorage } from "classes/PersistentStorage";

import Authentication from "components/authentication/Authentication";
import LeftSideContainer from "components/leftSideComponents/LeftSideContainer";
import PortalContainer from "components/portal/PortalContainer";
import RightSideContainer from "components/rightSideComponents/RightSideContainer";

import { getAllStuffController } from "controllers/versionControlController/getAllStuffController";

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
      tempState: { selectedContact },
      globalState: { viewMode },
    },
    hooksOutput: { dispatch, dispatchAsync },
  } = useMainContext();

  const mainToken = persistentStorage.getItem(
    PERSISTENT_STORAGE_KEYS.MAIN_TOKEN
  );

  useEffect(() => {
    addOnlineStatusEvents();
  }, []);

  useEffect(() => {
    const fn = async () => {
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
        printCatchError(fn.name, error);
      } finally {
        dispatch(
          globalActions.globalLoadingStateOpenChangeAction({ open: false })
        );
      }
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainToken]);

  useEffect(() => {
    const {
      EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
    } = appOptions.getOptions();

    eventManager.addListener(ALL_STUFF_RECEIVED, allStuffReceivedListener);

    return () => {
      eventManager.removeAllListener(ALL_STUFF_RECEIVED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!userState.privateId || viewMode !== VIEW_MODES.MESSENGER ? (
        <Authentication />
      ) : (
        <>
          <Grid container style={{ height: "100vh" }}>
            <Grid
              sx={{ backgroundColor: "lightcyan" }}
              item
              container
              sm={12}
              md={4}
              lg={3}
            >
              <LeftSideContainer />
            </Grid>

            <Grid
              sx={{ backgroundColor: "tomato", height: "100%" }}
              item
              container
              lg={9}
              md={8}
            >
              {selectedContact.privateId && <RightSideContainer />}
            </Grid>
          </Grid>
        </>
      )}
      <PortalContainer />
    </>
  );
};

export default MainContainer;
