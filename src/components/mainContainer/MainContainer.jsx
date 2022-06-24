import { useEffect } from "react";

import { Grid } from "@mui/material";

import { backdropAction } from "actions/globalActions";

import { emitters } from "classes/Emitters";

import Authentication from "components/authentication/Authentication";
import LeftSideContainer from "components/leftSideComponents/LeftSideContainer";
import PortalContainer from "components/portal/PortalContainer";
import RightSideContainer from "components/rightSideComponents/RightSideContainer";

import { EVENT_EMITTER_EVENTS } from "configs/configs";

import { getCountriesCrl } from "controllers/authControllers/getCountriesCrl";
import { userStatusCheckerCrl } from "controllers/authControllers/userStatusCheckerCrl";
import { getUserChatsLastMessageCrl } from "controllers/messageControllers/getUserChatsLastMessageCrl";
import { getAllStuffCrl } from "controllers/versionControlController/getAllStuffCrl";

import { onlineConnectionChecker } from "functions/events/onlineConnectionsChecker";

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
    onlineConnectionChecker();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        emitters.addListener({
          event: EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED,
          listener: async () => {
            dispatch(getCountriesCrl());
          },
        });
        emitters.addListener({
          event: EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED,
          listener: async () => {
            if (userState.privateID) {
              const { userState } = await dispatch(userStatusCheckerCrl());
              await dispatch(getUserChatsLastMessageCrl({ userState }));
            }
          },
        });

        await dispatch(getAllStuffCrl());
      } catch (error) {
        console.log("MainContainer auth catch", error);
      } finally {
        dispatch(backdropAction({ backdropState: { open: false } }));
      }
    })();
    // eslint-disable-next-line
  }, [userState.mainToken]);

  return (
    <>
      {!userState.privateID || viewMode !== INITIAL_VIEW_MODE.MESSENGER ? (
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
              {selectedContact.privateID && <RightSideContainer />}
            </Grid>
          </Grid>
        </>
      )}
      <PortalContainer />
    </>
  );
};

export default MainContainer;
