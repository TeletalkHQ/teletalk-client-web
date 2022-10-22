import { actions } from "actions/actions";

import { commonFunctionalities } from "classes/CommonFunctionalities";

import Copyright from "components/utils/Copyright";
import CreateNewUser from "pages/authentication/CreateNewUser";
import SignIn from "pages/authentication/SignIn";
import VerifySignIn from "pages/authentication/VerifySignIn";

import { useMainContext } from "hooks/useMainContext";

import { VIEW_MODES } from "variables/otherVariables/helpers";

const Authentication = () => {
  const {
    hooksOutput: { dispatch },
    state: {
      global: { viewMode },
    },
  } = useMainContext();

  const handleBackToSignInClick = () => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
    commonFunctionalities.changeViewMode().signIn();
  };

  const authComponent = () => {
    const props = {
      onBackToSignInClick: handleBackToSignInClick,
    };
    const Views = {
      [VIEW_MODES.SIGN_IN]: SignIn,
      [VIEW_MODES.VERIFY_SIGN_IN]: VerifySignIn,
      [VIEW_MODES.NEW_USER_PROFILE]: CreateNewUser,
    };

    const View = Views[viewMode];

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

export default Authentication;
