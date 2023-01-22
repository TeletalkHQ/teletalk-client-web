import Auth from "src/containers/auth";
import Messenger from "src/containers/messenger";
import Portal from "src/containers/portal";
import InitialSetup from "src/containers/InitialSetup";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { stateStatics } from "src/store/stateStatics";
import { commonActions } from "src/store/commonActions";

const View = () => {
  const state = useSelector();
  const dispatch = useDispatch();

  const handleGlobalLoadingClose = () => {
    dispatch(commonActions.closeGlobalLoading());
  };

  const visibleContainer = () => {
    const viewMode = state.global.viewMode;

    const {
      AUTH,
      INITIAL_SETUP,
      MESSENGER,
      NEW_USER_PROFILE,
      SIGN_IN,
      VERIFY_SIGN_IN,
    } = stateStatics.VIEW_MODES;

    const authenticationViewModes = [
      AUTH,
      NEW_USER_PROFILE,
      SIGN_IN,
      VERIFY_SIGN_IN,
    ];

    if (viewMode === INITIAL_SETUP) return InitialSetup;
    if (authenticationViewModes.includes(viewMode)) return Auth;
    if (viewMode === MESSENGER) return Messenger;
  };

  const Container = visibleContainer();

  return (
    <>
      <>
        <Container />

        {state.global.initialSetupDetails.status ===
          stateStatics.INITIAL_SETUP_STATUS.DONE && (
          <Portal onGlobalLoadingClose={handleGlobalLoadingClose} />
        )}
      </>
    </>
  );
};

export default View;
