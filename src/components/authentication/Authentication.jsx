import { useMemo } from "react";

import { tempActions } from "actions/tempActions";

import { commonFunctionalities } from "classes/CommonFunctionalities";

import Copyright from "components/utils/Copyright";
import CreateNewUser from "components/authentication/CreateNewUser";
import SignIn from "components/authentication/SignIn";
import VerifySignIn from "components/authentication/VerifySignIn";

import { useMainContext } from "hooks/useMainContext";

import { VIEW_MODES } from "variables/otherVariables/constants";

const { verificationCodeOnChangeAction } = tempActions;

const Authentication = () => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: { viewMode },
    },
  } = useMainContext();

  const handleBackToSignInClick = () => {
    dispatch(verificationCodeOnChangeAction({ verificationCode: "" }));
    commonFunctionalities.changeViewMode().signIn();
  };

  const authComponent = useMemo(() => {
    const props = {
      onBackToSignInClick: handleBackToSignInClick,
    };
    const componentOutput = (Component) => <Component {...props} />;

    switch (viewMode) {
      case VIEW_MODES.SIGN_IN:
        return componentOutput(SignIn);

      case VIEW_MODES.VERIFY_SIGN_IN:
        return componentOutput(VerifySignIn);

      case VIEW_MODES.NEW_USER_PROFILE:
        return componentOutput(CreateNewUser);

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  return (
    <>
      {authComponent}
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
