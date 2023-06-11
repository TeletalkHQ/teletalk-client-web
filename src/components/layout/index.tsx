import React, { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";

import { windowUtilities } from "~/classes/WindowUtilities";

import { appConfigs } from "~/classes/AppConfigs";

import { MainContext } from "~/context/MainContext";

import { events } from "~/events";

import { assignDispatch } from "~/helpers/extractedDispatch";

import { baseTheme } from "~/theme/baseTheme";

interface Props {
  children: JSX.Element;
}
const Layout: React.FC<Props> = ({ children }) => {
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const updater = () => {
      setForceUpdate(!forceUpdate);
    };
    windowUtilities.addProperty("updater", updater);
  }, [forceUpdate]);

  useEffect(() => {
    windowUtilities.addProperty("state", state);
  }, [state]);

  useEffect(() => {
    assignDispatch(dispatch);
  }, [dispatch]);

  useEffect(() => {
    events.websocket.otherEvents();
  }, []);

  const maxNotification = appConfigs.getConfigs().ui.maxNotification;
  return (
    <SnackbarProvider maxSnack={maxNotification}>
      <MainContext.Provider value={{}}>
        <ThemeProvider theme={baseTheme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </MainContext.Provider>
    </SnackbarProvider>
  );
};

export default Layout;
