import { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import { appConfigs } from "~/classes/AppConfigs";
import { windowUtilities } from "~/classes/WindowUtilities";

import View from "~/containers/view";

import { MainContext } from "~/context/MainContext";

import { events } from "~/events";

import { assignDispatch } from "~/helpers/extractedDispatch";

import { baseTheme } from "~/theme/baseTheme";

const App = () => {
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
          <View />
        </ThemeProvider>
      </MainContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
