import { useEffect } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MainContainer from "components/mainContainer/MainContainer";

import { configs } from "configs/configs";

import { MainContext } from "contexts/MainContext";

import { dispatchInjector } from "functions/others/injectors/dispatchInjector";

import { useThunkReducer } from "hooks/useThunkReducer";

import { rootReducer } from "reducers/index";

import { baseTheme } from "theme/baseTheme";

import { initialStates } from "variables/initials/initialStates/initialStates";

const App = () => {
  const [state = initialStates, dispatch] = useThunkReducer(
    rootReducer,
    initialStates,
    configs.useThunkReducer
  );

  useEffect(() => {
    dispatchInjector({ dispatch });
  }, [dispatch]);

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
