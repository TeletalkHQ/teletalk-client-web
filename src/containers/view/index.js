import Messenger from "src/containers/messenger";
import Portal from "src/containers/portal";
import InitialSetup from "src/containers/InitialSetup";

import { useDispatch, useSelector } from "react-redux";

import { stateStatics } from "src/store/stateStatics";
import { commonActions } from "src/store/commonActions";
import CheckCurrentUser from "src/containers/checkCurrentUser";
import CreateNewUser from "src/containers/createNewUser";
import SignIn from "src/containers/signIn";
import Verify from "src/containers/verify";

const View = () => {
  const state = useSelector((state) => state);
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
    INITIAL_SETUP,
    MESSENGER,
    CREATE_NEW_USER,
    SIGN_IN,
    VERIFY_SIGN_IN,
    CHECK_CURRENT_USER,
  } = stateStatics.VIEW_MODES;

  switch (viewMode) {
    case INITIAL_SETUP:
      return InitialSetup;
    case CHECK_CURRENT_USER:
      return CheckCurrentUser;
    case SIGN_IN:
      return SignIn;
    case VERIFY_SIGN_IN:
      return Verify;
    case CREATE_NEW_USER:
      return CreateNewUser;
    case MESSENGER:
      return Messenger;

    default:
      return null;
  }
};

export default View;
