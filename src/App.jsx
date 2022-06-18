import { useEffect } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";

import MainContainer from "components/mainContainer/MainContainer";

import { dispatchInjector } from "functions/others/injectors/dispatchInjector";
import { snackbarInjector } from "functions/others/injectors/snackbarInjector";

import { useThunkReducer } from "hooks/useThunkReducer";

import { MainContext } from "contexts/MainContext";

import { rootReducer } from "reducers/index";

import { initialStates } from "variables/initials/initialStates/initialStates";

import { baseTheme } from "theme/baseTheme";

import { configs } from "configs/configs";

const App = () => {
  const [state = initialStates, dispatch] = useThunkReducer(
    rootReducer,
    initialStates,
    configs.useThunkReducer
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    dispatchInjector({ dispatch });
  }, [dispatch]);
  useEffect(() => {
    snackbarInjector({ enqueueSnackbar, closeSnackbar });
  }, [enqueueSnackbar, closeSnackbar]);

  console.log(state);

  return (
    <MainContext.Provider
      value={{ state, dispatch, hooksOutput: { dispatch } }}
    >
      <ThemeProvider theme={baseTheme}>
        <CssBaseline enableColorScheme />
        <MainContainer />
      </ThemeProvider>
    </MainContext.Provider>
  );
};

export default App;
