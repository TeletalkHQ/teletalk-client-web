import { useEffect } from "react";

import { Grid } from "@mui/material";

import { globalActions } from "actions/globalActions";

import { emitters } from "classes/Emitters";
import { appOptions } from "classes/AppOptions";

import Authentication from "components/authentication/Authentication";
import LeftSideContainer from "components/leftSideComponents/LeftSideContainer";
import PortalContainer from "components/portal/PortalContainer";
import RightSideContainer from "components/rightSideComponents/RightSideContainer";

import { getCountriesController } from "controllers/authControllers/getCountriesController";
import { userStatusCheckerController } from "controllers/authControllers/userStatusCheckerController";
import { getUserChatsLastMessageController } from "controllers/messageControllers/getUserChatsLastMessageController";
import { getAllStuffController } from "controllers/versionControlController/getAllStuffController";

import { addOnlineStatusEvents } from "events/onlineConnectionsChecker";

import { useMyContext } from "hooks/useMyContext";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";

const MainContainer = () => {
  const {
    state: {
      userState,
      tempState: { selectedContact },
      globalState: { viewMode },
    },
    hooksOutput: { dispatch },
  } = useMyContext();

  useEffect(() => {
    addOnlineStatusEvents();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        emitters.addListener({
          event: appOptions.options.EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED,
          listener: async () => {
            dispatch(getCountriesController());
          },
        });
        emitters.addListener({
          event: appOptions.options.EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED,
          listener: async () => {
            if (userState.privateId) {
              const { user } = await dispatch(userStatusCheckerController());
              await dispatch(getUserChatsLastMessageController({ user }));
            }
          },
        });

        await dispatch(getAllStuffController());
      } catch (error) {
        console.log("MainContainer auth catch", error);
      } finally {
        dispatch(
          globalActions.backdropAction({ backdropState: { open: false } })
        );
      }
    })();
    // eslint-disable-next-line
  }, [userState.mainToken]);

  return (
    <>
      {!userState.privateId || viewMode !== INITIAL_VIEW_MODE.MESSENGER ? (
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
