import Copyright from "src/components/other/Copyright";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import CreateNewUser from "src/containers/auth/CreateNewUser";
import SignIn from "src/containers/auth/SignIn";
import VerifySignIn from "src/containers/auth/VerifySignIn";

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

  const authComponent = () => {
    const props = {
      onBackToSignInClick: handleBackToSignInClick,
    };
    const Views = {
      [stateStatics.VIEW_MODES.SIGN_IN]: SignIn,
      [stateStatics.VIEW_MODES.VERIFY_SIGN_IN]: VerifySignIn,
      [stateStatics.VIEW_MODES.NEW_USER_PROFILE]: CreateNewUser,
    };

    const View = Views[state.global.viewMode];

    return <View {...props} />;
  };

  return (
    <>
      {authComponent()}
      <Copyright
        sx={{
          mb: 4,
          mt: 8,
        }}
      />
    </>
  );
};

export default Auth;
