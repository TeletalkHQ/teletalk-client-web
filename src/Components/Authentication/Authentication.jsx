import { useEffect } from "react";

import Copyright from "~/Components/Utils/Copyright";
import NewUserProfile from "~/Components/Authentication/NewUserProfile";
import SignIn from "~/Components/Authentication/SignIn";
import VerifySignIn from "~/Components/Authentication/VerifySignIn";

import { useMyContext } from "~/Hooks/useMyContext";

import { signInCrl } from "~/Controllers/AuthControllers/signInCrl";
import { verifySignInCrl } from "~/Controllers/AuthControllers/verifySignInCrl";
import { welcomeCrl } from "~/Controllers/otherControllers/welcomeCrl";

import {
  phoneNumberAction,
  verifyCodeAction,
  countryCodeAction,
  countryNameAction,
  firstNameAction,
  lastNameAction,
} from "~/Actions/UserActions/userActions";
import { viewModeAction } from "~/Actions/GlobalActions/globalActions";

import { INITIAL_VIEW_MODE } from "~/Variables/Constants/Initials/InitialValues/initialValues";
import { selectedCountryAction } from "~/Actions/OtherActions/otherActions";
import { createNewUserCrl } from "~/Controllers/AuthControllers/createNewUserCrl";

const numberRegex = new RegExp("^[0-9]+$");

const Authentication = () => {
  const {
    state: {
      userState: {
        phoneNumber,
        countryCode,
        countryName,
        verifyCode,
        loading,
        firstName,
        lastName,
      },
      globalState: { viewMode },
      otherState: { countries, countryNameInputValue, selectedCountry },
    },
    hooksOutput: { dispatch },
  } = useMyContext();

  useEffect(() => {
    dispatch(welcomeCrl());

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

    (value?.length < 15 || value === "") &&
      dispatch(phoneNumberAction({ phoneNumber: value }));
  };

  const handleCountryCodeChange = (event) => {
    const value = event.target.value;
    const isNumber = numberRegex.test(value);

    if ((isNumber && value?.length <= 6) || value === "") {
      dispatch(countryCodeAction({ countryCode: value }));
      const country = countries.find((c) => c.countryCode === value) || null;
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
            countryNameInputValue={countryNameInputValue}
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
