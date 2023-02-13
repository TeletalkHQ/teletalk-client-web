import { useEffect, useState } from "react";

import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "src/classes/AppConfigs";

import View from "src/containers/view";

import { MainContext } from "src/context/MainContext";

import { useThunkReducer } from "src/hooks/useThunkReducer";

import { store } from "src/store/store";

import { baseTheme } from "src/theme/baseTheme";

import { websocket } from "src/classes/Websocket";

const App = () => {
  const [state, dispatch] = useThunkReducer(
    store.rootReducer,
    {},
    store.initialStates
  );
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const updater = () => {
      setForceUpdate(!forceUpdate);
    };
    windowUtilities
      .addProperty("websocket", websocket)
      .addProperty("updater", updater);
  }, [forceUpdate]);

  useEffect(() => {
    windowUtilities.addProperty("state", state);
  }, [state]);

  const dispatchAsync = async (action) => await dispatch(action);

  const getState = () => state;

  const maxNotification = appConfigs.getConfigs().ui.maxNotification;
  return (
    <SnackbarProvider maxSnack={maxNotification}>
      <MainContext.Provider
        value={{
          hooksOutput: {
            dispatch,
            dispatchAsync,
          },
          others: {
            getState,
          },
          state,
        }}
      >
        <ThemeProvider theme={baseTheme}>
          <CssBaseline enableColorScheme />
          <View />
        </ThemeProvider>
      </MainContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
