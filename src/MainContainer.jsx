import { useEffect } from "react";

import { Grid } from "@mui/material";

import { globalActions } from "actions/globalActions";

import { apiManager } from "classes/apiClasses/ApiManager";
import { appOptions } from "classes/AppOptions";
import { eventManager } from "classes/EventManager";
import { persistentStorage } from "classes/PersistentStorage";
import { validatorManager } from "classes/ValidatorManager";

import Authentication from "components/authentication/Authentication";
import LeftSideContainer from "components/leftSideComponents/LeftSideContainer";
import PortalContainer from "components/portal/PortalContainer";
import RightSideContainer from "components/rightSideComponents/RightSideContainer";

import { getCountriesController } from "controllers/authControllers/getCountriesController";
import { getUserChatsLastMessageController } from "controllers/messageControllers/getUserChatsLastMessageController";
import { getAllStuffController } from "controllers/versionControlController/getAllStuffController";
import { userStatusCheckerController } from "controllers/authControllers/userStatusCheckerController";
import { welcomeMessageController } from "controllers/otherControllers/welcomeMessageController";

import { addOnlineStatusEvents } from "events/onlineConnectionsChecker";

import { useMainContext } from "hooks/useMainContext";

import {
  PERSISTENT_STORAGE_KEYS,
  VIEW_MODES,
} from "variables/others/constants";

const MainContainer = () => {
  const {
    state: {
      userState,
      tempState: { selectedContact },
      globalState: { viewMode },
    },
    hooksOutput: { dispatch, dispatchAsync },
  } = useMainContext();

  useEffect(() => {
    addOnlineStatusEvents();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {
          EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
        } = appOptions.getOptions();

        //TODO Extract it to somewhere
        const allStuffReceivedListener = async () => {
          if (userState.privateId) {
            const { user } = await dispatchAsync(userStatusCheckerController());

            await dispatchAsync(getUserChatsLastMessageController({ user }));
          }
        };

        eventManager.addListener(ALL_STUFF_RECEIVED, allStuffReceivedListener);

        await dispatchAsync(getAllStuffController());
      } catch (error) {
        console.log("MainContainer auth catch", error);
      } finally {
        dispatch(
          globalActions.globalLoadingStateOpenChangeAction({ open: false })
        );
      }
    })();
    // eslint-disable-next-line
  }, [persistentStorage.getItem(PERSISTENT_STORAGE_KEYS.MAIN_TOKEN)]);

  useEffect(() => {
    const {
      EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
    } = appOptions.getOptions();

    //TODO Extract it to somewhere
    const allStuffReceivedListener = async () => {
      apiManager.rebuildAllApis();

      validatorManager.compileValidators();

      await dispatchAsync(getCountriesController());
      dispatch(welcomeMessageController());
    };

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
