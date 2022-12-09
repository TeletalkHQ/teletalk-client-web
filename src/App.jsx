import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import Containers from "src/containers";

import { MainContext } from "src/context/MainContext";

import { useThunkReducer } from "src/hooks/useThunkReducer";

import { store } from "src/store/store";

import { baseTheme } from "src/theme/baseTheme";

const states = store.initialStates();

const App = () => {
  const [state = states, dispatch] = useThunkReducer(store.rootReducer, states);

  return (
    //TODO: Move this configs to appConfigs
    <SnackbarProvider maxSnack={10}>
      <MainContext.Provider
        value={{
          hooksOutput: {
            dispatch,
            dispatchAsync: async (action) => await dispatch(action),
          },
          others: {
            getState: () => state,
          },
          state,
        }}
      >
        <ThemeProvider theme={baseTheme}>
          <CssBaseline enableColorScheme />
          <Containers.Provider />
        </ThemeProvider>
      </MainContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
