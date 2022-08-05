import { useEffect } from "react";

import { SnackbarProvider } from "notistack";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { appConfigs } from "classes/AppConfigs";

import MainContainer from "MainContainer";

import { MainContext } from "contexts/MainContext";

import { dispatchInjector } from "functions/injectors/dispatchInjector";

import { useThunkReducer } from "hooks/useThunkReducer";

import { rootReducer } from "reducers/rootReducer";

import { baseTheme } from "theme/baseTheme";

import { initialStates } from "variables/initials/initialStates/initialStates";

const App = () => {
  const [state = initialStates, dispatch] = useThunkReducer(
    rootReducer,
    initialStates,
    appConfigs.configs.useThunkReducer
  );

  useEffect(() => {
    dispatchInjector(dispatch);
  }, [dispatch]);

  useEffect(() => {
    window.state = state;
    window.appConfigs = appConfigs;
  }, [state]);

  return (
    <SnackbarProvider>
      <MainContext.Provider
        value={{ state, dispatch, hooksOutput: { dispatch } }}
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
