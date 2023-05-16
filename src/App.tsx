import { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { windowUtilities } from "src/classes/WindowUtilities";

import { appConfigs } from "src/classes/AppConfigs";

import View from "src/containers/view";

import { MainContext } from "src/context/MainContext";

import { events } from "src/events";

import { assignDispatch } from "src/helpers/extractedDispatch";

import { baseTheme } from "src/theme/baseTheme";

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
      <MainContext.Provider value={null}>
        <ThemeProvider theme={baseTheme}>
          <CssBaseline enableColorScheme />
          <View />
        </ThemeProvider>
      </MainContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
