import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import { appConfigs } from "src/classes/AppConfigs";

import Provider from "src/containers/provider";

import { MainContext } from "src/context/MainContext";

import { useThunkReducer } from "src/hooks/useThunkReducer";

import { store } from "src/store/store";

import { baseTheme } from "src/theme/baseTheme";

const states = store.initialStates();

const App = () => {
  const [state = states, dispatch] = useThunkReducer(store.rootReducer, states);

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
          <Provider />
        </ThemeProvider>
      </MainContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
