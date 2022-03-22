import { useMemo } from "react";

import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MainContainer from "~/Components/MainContainer/MainContainer";

import { dispatchInjector } from "~/Functions/Others/Injectors/dispatchInjector";

import { useThunkReducer } from "~/Hooks/useThunkReducer";

import { MainContext } from "~/Contexts/MainContext";

import { rootReducer } from "~/Reducers/index";

import { initialStateWithoutInitialWord } from "~/Variables/Constants/Initials/InitialStates/initialStates";

import { baseTheme } from "~/Theme/baseTheme";

import { configs } from "./Configs/configs";

const App = () => {
  const [state = initialStateWithoutInitialWord, dispatch] = useThunkReducer(
    rootReducer,
    initialStateWithoutInitialWord,
    configs.useThunkReducer
  );

  useMemo(() => {
    dispatchInjector({ dispatch });
  }, [dispatch]);

  logger.log(state);

  return (
    <MainContext.Provider
      value={{ state, dispatch, hooksOutput: { dispatch } }}
    >
      <ThemeProvider theme={baseTheme}>
        <CssBaseline enableColorScheme />
        <SnackbarProvider>
          <MainContainer />
        </SnackbarProvider>
      </ThemeProvider>
    </MainContext.Provider>
  );
};

export default App;
