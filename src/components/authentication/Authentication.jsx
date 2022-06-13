import { useEffect } from "react";

import Copyright from "~/components/utils/Copyright";
import NewUserProfile from "~/components/authentication/NewUserProfile";
import SignIn from "~/components/authentication/SignIn";
import VerifySignIn from "~/components/authentication/VerifySignIn";

import { isNumber } from "~/functions/utils/utils";

import { useMyContext } from "~/hooks/useMyContext";

import { signInCrl } from "~/controllers/authControllers/signInCrl";
import { verifySignInCrl } from "~/controllers/authControllers/verifySignInCrl";
import { welcomeCrl } from "~/controllers/otherControllers/welcomeCrl";

import {
  verifyCodeAction,
  countryCodeAction,
  countryNameAction,
  firstNameAction,
  lastNameAction,
} from "~/actions/tempActions/tempActions";
import { viewModeAction } from "~/actions/globalActions/globalActions";

import { INITIAL_VIEW_MODE } from "~/variables/constants/initials/initialValues/initialValues";
import { selectedCountryAction } from "~/actions/otherActions/otherActions";
import { createNewUserCrl } from "~/controllers/authControllers/createNewUserCrl";
import { phoneNumberAction } from "~/actions/tempActions/tempActions";
import { emitters } from "~/functions/events/Emitters";
import { EVENT_EMITTER_EVENTS } from "~/variables/constants/others/otherConstants";

const Authentication = () => {
  const {
    state: {
      tempState: {
        phoneNumber,
        countryCode,
        countryName,
        verifyCode,
        firstName,
        lastName,
        selectedCountry,
      },
      globalState: {
        viewMode,
        loadingState: { loading },
      },
      otherState: { countries },
    },
    hooksOutput: { dispatch },
  } = useMyContext();

  useEffect(() => {
    emitters.addListener({
      event: EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED,
      listener: async () => {
        dispatch(welcomeCrl());
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignInClick = () => {
    dispatch(signInCrl());
  };

  const handleVerifyClick = () => {
    dispatch(verifySignInCrl());
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;

    if ((isNumber({ value }) && value?.length < 15) || value === "") {
      dispatch(phoneNumberAction({ phoneNumber: value }));
    }
  };

  const handleCountryCodeChange = (event) => {
    const value = event.target.value;

    if ((isNumber({ value }) && value?.length <= 6) || value === "") {
      dispatch(countryCodeAction({ countryCode: value }));
      const country = countries?.find((c) => c.countryCode === value) || null;
      dispatch(selectedCountryAction({ selectedCountry: country }));
    }
  };

  const handleVerifyCodeChange = (e) => {
    const value = e?.target?.value;

    (value?.length <= 6 || value === "") &&
      dispatch(verifyCodeAction({ verifyCode: value }));
  };

  const handleBackClick = () => {
    dispatch(viewModeAction({ viewMode: INITIAL_VIEW_MODE.SIGN_IN }));
  };

  const handleCountryNameOnchange = (newValue) => {
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
    dispatch(createNewUserCrl());
  };

  const component = () => {
    switch (viewMode) {
      case INITIAL_VIEW_MODE.SIGN_IN:
        return (
          <SignIn
            countries={countries}
            countryCode={countryCode}
            loading={loading}
            onCountryCodeChange={handleCountryCodeChange}
            onPhoneNumberChange={handlePhoneNumberChange}
            onSignInClick={handleSignInClick}
            phoneNumber={phoneNumber}
            countryName={countryName}
            onCountryNameOnchange={handleCountryNameOnchange}
            onCountryNameOnInputChange={handleCountryNameOnInputChange}
            selectedCountry={selectedCountry}
          />
        );

      case INITIAL_VIEW_MODE.VERIFY_SIGN_IN:
        return (
          <VerifySignIn
            countryCode={countryCode}
            onBackClick={handleBackClick}
            onVerifyClick={handleVerifyClick}
            onVerifyCodeChange={handleVerifyCodeChange}
            verifyCode={verifyCode}
            phoneNumber={phoneNumber}
            loading={loading}
          />
        );

      case INITIAL_VIEW_MODE.NEW_USER_PROFILE:
        return (
          <NewUserProfile
            onBackClick={handleBackClick}
            loading={loading}
            firstNameInput={firstName}
            lastNameInput={lastName}
            onLastNameOnChange={handleLastNameOnChange}
            onConfirmClick={handleConfirmClick}
            onFirstNameOnChange={handleFirstNameOnChange}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      {component()}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};

export default Authentication;
