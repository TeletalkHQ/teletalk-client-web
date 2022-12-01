import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import Containers from "containers";

import { MainContext } from "context/MainContext";

import { useThunkReducer } from "hooks/useThunkReducer";

import { store } from "store/store";

import { baseTheme } from "theme/baseTheme";

const states = store.initialState();

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
