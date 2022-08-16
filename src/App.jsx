import { useEffect } from "react";

import { SnackbarProvider } from "notistack";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { appConfigs } from "classes/AppConfigs";
import { windowUtilities } from "classes/WindowUtilities";

import MainContainer from "MainContainer";

import { MainContext } from "contexts/MainContext";

import { useThunkReducer } from "hooks/useThunkReducer";

import { rootReducer } from "reducers/rootReducer";

import { baseTheme } from "theme/baseTheme";

import { initialStates } from "variables/initials/initialStates/initialStates";

const App = () => {
  const [state = initialStates, dispatch] = useThunkReducer(
    rootReducer,
    initialStates,
    appConfigs.getConfigs().useThunkReducer
  );

  useEffect(() => {
    windowUtilities
      .addProperty("state", state)
      .addProperty("appConfigs", appConfigs);
  }, [state]);

  return (
    <SnackbarProvider>
      <MainContext.Provider
        value={{
          hooksOutput: {
            dispatch,
            dispatchAsync: async (action) => await dispatch(action),
          },
          state,
        }}
      >
        <ThemeProvider theme={baseTheme}>
          <CssBaseline enableColorScheme />
          <MainContainer />
        </ThemeProvider>
      </MainContext.Provider>
    </SnackbarProvider>
  );
};

export default App;
