import { useEffect } from "react";

import { tempActions } from "actions/tempActions";

import { appOptions } from "classes/AppOptions";
import { customTypeof } from "classes/CustomTypeof";
import { eventManager } from "classes/EventManager";
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

import { viewModeChange } from "functions/utilities/commonActions";

import { useMainContext } from "hooks/useMainContext";

import { VIEW_MODES } from "variables/others/staticValues";
import { elementNames } from "variables/initials/initialValues/elementNames";

const {
  countryCodeOnChangeAction,
  countryNameOnChangeAction,
  firstNameOnChangeAction,
  lastNameOnChangeAction,
  phoneNumberOnChangeAction,
  selectedCountryAction,
  verificationCodeOnChangeAction,
} = tempActions;

const Authentication = () => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: {
        appProgressions: { authenticationProgress },
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
  } = useMainContext();

  useEffect(() => {
    eventManager.addListener({
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
      dispatch(phoneNumberOnChangeAction({ phoneNumber: value }));
    }
  };

  const handleCountryCodeChange = (event) => {
    const value = event.target.value;

    if (
      (customTypeof.check(value).type.stringNumber &&
        stringUtilities.valueLength(value) <= 6) ||
      value === ""
    ) {
      dispatch(countryCodeOnChangeAction({ countryCode: value }));
      const country = countries?.find((c) => c.countryCode === value) || null;
      dispatch(selectedCountryAction({ selectedCountry: country }));
    }
  };

  const handleVerificationCodeChange = (e) => {
    const value = e?.target?.value;

    (stringUtilities.valueLength(value) <= 6 || value === "") &&
      dispatch(verificationCodeOnChangeAction({ verificationCode: value }));
  };

  const handleBackClick = () => {
    dispatch(verificationCodeOnChangeAction({ verificationCode: "" }));
    dispatch(viewModeChange(VIEW_MODES.SIGN_IN));
  };

  const handleCountryNameAutocompleteOnchange = (newValue) => {
    dispatch(selectedCountryAction({ selectedCountry: newValue || null }));
    dispatch(
      countryCodeOnChangeAction({ countryCode: newValue?.countryCode || "" })
    );
    dispatch(
      countryNameOnChangeAction({ countryName: newValue?.countryName || "" })
    );
  };

  const handleCountryNameOnInputChange = (newInputValue) => {
    dispatch(countryNameOnChangeAction({ countryName: newInputValue }));
  };

  const handleFirstNameOnChange = (e) => {
    dispatch(firstNameOnChangeAction({ firstName: e.target.value }));
  };

  const handleLastNameOnChange = (e) => {
    dispatch(lastNameOnChangeAction({ lastName: e.target.value }));
  };

  const handleConfirmClick = () => {
    dispatch(createNewUserController());
  };

  return (
    <>
      {((props) => {
        switch (viewMode) {
          case VIEW_MODES.SIGN_IN:
            return <SignIn {...props} />;

          case VIEW_MODES.VERIFY_SIGN_IN:
            return <VerifySignIn {...props} />;

          case VIEW_MODES.NEW_USER_PROFILE:
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
        authenticationProgress,
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
