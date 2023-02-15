import { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "src/classes/AppConfigs";
import { websocket } from "src/classes/Websocket";

import View from "src/containers/view";

import { MainContext } from "src/context/MainContext";

import { events } from "src/events";

import { store } from "src/store/store";

import { baseTheme } from "src/theme/baseTheme";

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const updater = () => {
      setForceUpdate(!forceUpdate);
    };
    windowUtilities
      .addProperty("websocket", websocket)
      .addProperty("updater", updater);
  }, [forceUpdate]);

  // useEffect(() => {
  //   windowUtilities.addProperty("state", state);
  // }, [state]);

  useEffect(() => {
    events.websocket.otherEvents();
  }, []);

  const maxNotification = appConfigs.getConfigs().ui.maxNotification;
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={maxNotification}>
        <MainContext.Provider value={null}>
          <ThemeProvider theme={baseTheme}>
            <CssBaseline enableColorScheme />
            <View />
          </ThemeProvider>
        </MainContext.Provider>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
