import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { appConfigs } from "classes/AppConfigs";

import MainContainer from "containers/MainContainer";

import { MainContext } from "contexts/MainContext";

import { useThunkReducer } from "hooks/useThunkReducer";

import { rootReducer } from "reducers/root";

import { baseTheme } from "theme/baseTheme";

import { initialStates } from "variables/initials/initialStates";

const App = () => {
  const [state = initialStates, dispatch] = useThunkReducer(
    rootReducer,
    initialStates,
    appConfigs.getConfigs().stateManagement
  );

  return (
    //TODO Move this configs to appConfigs
    <SnackbarProvider maxSnack={10}>
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
