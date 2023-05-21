import Messenger from "~/containers/messenger";
import Portal from "~/containers/portal";
import InitialSetup from "~/containers/InitialSetup";

import { useDispatch, useSelector } from "react-redux";

import { stateStatics } from "~/store/stateStatics";
import { commonActions } from "~/store/commonActions";
import CheckCurrentUser from "~/containers/checkCurrentUser";
import CreateNewUser from "~/containers/createNewUser";
import SignIn from "~/containers/signIn";
import Verify from "~/containers/verify";

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
    CHECK_CURRENT_USER,
    CREATE_NEW_USER,
    INITIAL_SETUP,
    MESSENGER,
    SIGN_IN,
    VERIFY_SIGN_IN,
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
      //TODO: Return fatality view
      return null;
  }
};

export default View;
