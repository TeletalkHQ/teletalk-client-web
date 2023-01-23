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

  const Container = visibleContainer(state.global.viewMode);

  return (
    <>
      <>
        <Container />
        <Portal onGlobalLoadingClose={handleGlobalLoadingClose} />
      </>
    </>
  );
};

const visibleContainer = (viewMode) => {
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

export default View;
