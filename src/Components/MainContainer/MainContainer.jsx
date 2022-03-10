import { useEffect, useMemo } from "react";

import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";

import LeftSideContainer from "~/Components/LeftSideComponents/LeftSideContainer";
import RightSideContainer from "~/Components/RightSideComponents/RightSideContainer";
import PortalContainer from "~/Components/Portal/PortalContainer";
import Authentication from "~/Components/Authentication/Authentication";

import { useMyContext } from "~/Hooks/useMyContext";

import { userStatusCheckerCrl } from "~/Controllers/AuthControllers/userStatusCheckerCrl";
import { getCountriesCrl } from "~/Controllers/AuthControllers/getCountriesCrl";
import { getUserChatsLastMessageCrl } from "~/Controllers/MessageControllers/getUserChatsLastMessageCrl";

import { snackbarInjector } from "~/Functions/Others/Injectors/snackbarInjector";
import { onlineConnectionChecker } from "~/Functions/EventListeners/onlineConnectionsChecker";

import { backdropAction } from "~/Actions/GlobalActions/globalActions";

import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { getAllStuffCrl } from "~/Controllers/VersionControlController/getAllStuffCrl";

const MainContainer = () => {
  const {
    state: {
      userState,
      tempState: { selectedContact },
      globalState: { viewMode },
    },
    hooksOutput: { dispatch },
  } = useMyContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useMemo(
    () => snackbarInjector({ enqueueSnackbar, closeSnackbar }),
    [enqueueSnackbar, closeSnackbar]
  );

  useEffect(() => {
    onlineConnectionChecker();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // await dispatch(getAllStuffCrl());
        // dispatch(getCountriesCrl());
        if (userState.privateID) {
          // const { userState } = await dispatch(userStatusCheckerCrl());
          // await dispatch(getUserChatsLastMessageCrl({ userState }));
        }
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
