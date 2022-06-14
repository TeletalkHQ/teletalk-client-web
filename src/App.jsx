import { useMemo } from "react";

import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MainContainer from "~/components/mainContainer/MainContainer";

import { dispatchInjector } from "~/functions/others/injectors/dispatchInjector";

import { useThunkReducer } from "~/hooks/useThunkReducer";

import { MainContext } from "~/contexts/MainContext";

import { rootReducer } from "~/reducers/index";

import { initialStateWithoutInitialWord } from "~/variables/constants/initials/initialStates/initialStates";

import { baseTheme } from "~/theme/baseTheme";

import { configs } from "./configs/configs";

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

const a = {};
