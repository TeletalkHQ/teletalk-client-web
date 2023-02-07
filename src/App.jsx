import { useEffect, useState } from "react";

import io from "socket.io-client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import { appConfigs } from "src/classes/AppConfigs";

import View from "src/containers/view";

import { MainContext } from "src/context/MainContext";

import { useThunkReducer } from "src/hooks/useThunkReducer";

import { store } from "src/store/store";

import { baseTheme } from "src/theme/baseTheme";

const serverUrl = appConfigs.getConfigs().apiConfigs.SERVER_BASE_URL;

const socket = io(serverUrl, {
  withCredentials: true,
});
const states = store.initialStates();

const App = () => {
  const [state = states, dispatch] = useThunkReducer(store.rootReducer, states);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const updater = () => {
      setForceUpdate(!forceUpdate);
    };
    windowUtilities
      .addProperty("updater", updater)
      .addProperty("sendPing", sendPing);
  }, [forceUpdate]);

  useEffect(() => {
    windowUtilities.addProperty("state", state);
  }, [state]);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on("connection", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
    socket.on("ping", (...data) => console.log(data));
    console.log("isConnected:", isConnected, "lastPong:", lastPong);
  };

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
            socket,
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
