import { actions } from "actions/actions";

import { commonJobsHandler } from "classes/CommonJobsHandler";

import Copyright from "components/utils/Copyright";

import { useMainContext } from "hooks/useMainContext";

import CreateNewUser from "pages/authentication/CreateNewUser";
import SignIn from "pages/authentication/SignIn";
import VerifySignIn from "pages/authentication/VerifySignIn";

import { VIEW_MODES } from "variables/otherVariables/helpers";

const Authentication = () => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const handleBackToSignInClick = () => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
    commonJobsHandler.changeViewMode().signIn();
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

export default Authentication;
