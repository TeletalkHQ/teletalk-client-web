import Copyright from "components/other/Copyright";

import { useMainContext } from "hooks/useMainContext";
import { useSelector } from "hooks/useThunkReducer";

import CreateNewUser from "containers/auth/CreateNewUser";
import SignIn from "containers/auth/SignIn";
import VerifySignIn from "containers/auth/VerifySignIn";

import { actions } from "store/actions";
import { stateStatics } from "store/stateStatics";
import { commonActions } from "store/commonActions";

const Auth = () => {
  const {
    hooksOutput: { dispatch },
  } = useMainContext();
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
