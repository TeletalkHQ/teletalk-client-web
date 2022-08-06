import { useEffect } from "react";

import { tempActions } from "actions/tempActions";
import { otherActions } from "actions/otherActions";
import { globalActions } from "actions/globalActions";

import { appOptions } from "classes/AppOptions";
import { customTypeof } from "classes/CustomTypeof";
import { emitters } from "classes/Emitters";
import { domUtilities } from "classes/DomUtilities";
import { stringUtilities } from "classes/StringUtilities";

import Copyright from "components/utils/Copyright";
import NewUserProfile from "components/authentication/NewUserProfile";
import SignIn from "components/authentication/SignIn";
import VerifySignIn from "components/authentication/VerifySignIn";

import { createNewUserController } from "controllers/authControllers/createNewUserController";
import { signInController } from "controllers/authControllers/signInController";
import { verifySignInController } from "controllers/authControllers/verifySignInController";
import { welcomeMessageController } from "controllers/otherControllers/welcomeMessageController";

import { appDispatch } from "functions/injectors/dispatchInjector";

import { useMyContext } from "hooks/useMyContext";

import { INITIAL_VIEW_MODE } from "variables/initials/initialValues/initialValues";
import { elementNames } from "variables/initials/initialValues/elementNames";

const { selectedCountryAction } = otherActions;
const {
  countryCodeAction,
  countryNameAction,
  firstNameAction,
  lastNameAction,
  phoneNumberAction,
  verificationCodeAction,
} = tempActions;

const Authentication = () => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: {
        loadingState: { loading },
        viewMode,
      },
      otherState: { countries },
      tempState: {
        countryCode,
        countryName,
        firstName,
        lastName,
        phoneNumber,
        selectedCountry,
        verificationCode,
      },
    },
  } = useMyContext();

  useEffect(() => {
    emitters.addListener({
      event: appOptions.options.EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED,
      listener: async () => {
        dispatch(welcomeMessageController());
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignInClick = () => {
    dispatch(signInController());
  };

  const handleVerifyClick = () => {
    domUtilities
      .setElementByName(elementNames.verificationCode)
      .focusElement()
      .selectAllValue();
    dispatch(verifySignInController());
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;

    if (
      (customTypeof.check(value).type.stringNumber &&
        stringUtilities.valueLength(value) < 15) ||
      value === ""
    ) {
      dispatch(phoneNumberAction({ phoneNumber: value }));
    }
  };

  const handleCountryCodeChange = (event) => {
    const value = event.target.value;

    if (
      (customTypeof.check(value).type.stringNumber &&
        stringUtilities.valueLength(value) <= 6) ||
      value === ""
    ) {
      dispatch(countryCodeAction({ countryCode: value }));
      const country = countries?.find((c) => c.countryCode === value) || null;
      appDispatch(selectedCountryAction({ selectedCountry: country }));
    }
  };

  const handleVerificationCodeChange = (e) => {
    const value = e?.target?.value;

    (stringUtilities.valueLength(value) <= 6 || value === "") &&
      dispatch(verificationCodeAction({ verificationCode: value }));
  };

  const handleBackClick = () => {
    dispatch(
      globalActions.viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN })
    );
  };

  const handleCountryNameAutocompleteOnchange = (newValue) => {
    dispatch(selectedCountryAction({ selectedCountry: newValue || null }));
    dispatch(countryCodeAction({ countryCode: newValue?.countryCode || "" }));
    dispatch(countryNameAction({ countryName: newValue?.countryName || "" }));
  };

  const handleCountryNameOnInputChange = (newInputValue) => {
    dispatch(countryNameAction({ countryName: newInputValue }));
  };

  const handleFirstNameOnChange = (e) => {
    dispatch(firstNameAction({ firstName: e.target.value }));
  };

  const handleLastNameOnChange = (e) => {
    dispatch(lastNameAction({ lastName: e.target.value }));
  };

  const handleConfirmClick = () => {
    dispatch(createNewUserController());
  };

  return (
    <>
      {((props) => {
        switch (viewMode) {
          case INITIAL_VIEW_MODE.SIGN_IN:
            return <SignIn {...props} />;

          case INITIAL_VIEW_MODE.VERIFY_SIGN_IN:
            return <VerifySignIn {...props} />;

          case INITIAL_VIEW_MODE.NEW_USER_PROFILE:
            return <NewUserProfile {...props} />;

          default:
            break;
        }
      })({
        countries,
        countryCode,
        countryName,
        firstName,
        lastName,
        loading,
        onBackClick: handleBackClick,
        onConfirmClick: handleConfirmClick,
        onCountryCodeChange: handleCountryCodeChange,
        onCountryNameAutocompleteOnchange:
          handleCountryNameAutocompleteOnchange,
        onCountryNameOnInputChange: handleCountryNameOnInputChange,
        onFirstNameOnChange: handleFirstNameOnChange,
        onLastNameOnChange: handleLastNameOnChange,
        onPhoneNumberChange: handlePhoneNumberChange,
        onSignInClick: handleSignInClick,
        onVerifyClick: handleVerifyClick,
        onVerificationCodeChange: handleVerificationCodeChange,
        phoneNumber,
        selectedCountry,
        verificationCode,
      })}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};

export default Authentication;
