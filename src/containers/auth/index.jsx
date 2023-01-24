import Copyright from "src/components/other/Copyright";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import CreateNewUser from "src/containers/auth/CreateNewUser";
import CheckCurrentUser from "src/containers/auth/CheckCurrentUser";
import SignIn from "src/containers/auth/SignIn";
import Verify from "src/containers/auth/Verify";

import { actions } from "src/store/actions";
import { stateStatics } from "src/store/stateStatics";
import { commonActions } from "src/store/commonActions";

const Auth = () => {
  const dispatch = useDispatch();
  const state = useSelector();

  const handleBackToSignInClick = () => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
    dispatch(commonActions.changeViewMode.signIn());
  };

  const Container = visibleContainer(state.global.viewMode);

  return (
    <>
      <Container onBackToSignInClick={handleBackToSignInClick} />
      <Copyright
        sx={{
          mb: 4,
          mt: 8,
        }}
      />
    </>
  );
};

const visibleContainer = (viewMode) => Views[viewMode];
const Views = {
  [stateStatics.VIEW_MODES.AUTH]: CheckCurrentUser,
  [stateStatics.VIEW_MODES.SIGN_IN]: SignIn,
  [stateStatics.VIEW_MODES.VERIFY_SIGN_IN]: Verify,
  [stateStatics.VIEW_MODES.NEW_USER_PROFILE]: CreateNewUser,
};

export default Auth;
