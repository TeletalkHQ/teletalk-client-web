import { tempActions } from "actions/tempActions";

import { arrayUtilities } from "classes/ArrayUtilities";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { customTypeof } from "classes/CustomTypeof";
import { domUtilities } from "classes/DomUtilities";
import { stringUtilities } from "classes/StringUtilities";

import Copyright from "components/utils/Copyright";
import NewUserProfile from "components/authentication/NewUserProfile";
import SignIn from "components/authentication/SignIn";
import VerifySignIn from "components/authentication/VerifySignIn";

import { createNewUserController } from "controllers/authControllers/createNewUserController";
import { signInController } from "controllers/authControllers/signInController";
import { verifySignInController } from "controllers/authControllers/verifySignInController";

import { useMainContext } from "hooks/useMainContext";

import { VIEW_MODES } from "variables/otherVariables/constants";
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

  const handlePhoneNumberInputChange = (event) => {
    const value = event.target.value;

    if (
      (customTypeof.check(value).type.stringNumber &&
        stringUtilities.valueLength(value) < 15) ||
      value === ""
    ) {
      dispatch(phoneNumberOnChangeAction({ phoneNumber: value }));
    }
  };

  const handleCountryCodeInputChange = (event) => {
    const value = event.target.value;

    if (
      (customTypeof.check(value).type.stringNumber &&
        stringUtilities.valueLength(value) <= 6) ||
      value === ""
    ) {
      dispatch(countryCodeOnChangeAction({ countryCode: value }));

      const country =
        arrayUtilities.findByPropValueEquality(
          countries,
          value,
          "countryCode"
        ) || null;

      dispatch(selectedCountryAction({ selectedCountry: country }));
    }
  };

  const handleVerificationCodeInputChange = (e) => {
    const value = e?.target?.value;

    (stringUtilities.valueLength(value) <= 6 || value === "") &&
      dispatch(verificationCodeOnChangeAction({ verificationCode: value }));
  };

  const handleBackClick = () => {
    dispatch(verificationCodeOnChangeAction({ verificationCode: "" }));
    commonFunctionalities.changeViewMode().signIn();
  };

  const handleCountryNameAutocompleteInputChange = (newValue) => {
    dispatch(selectedCountryAction({ selectedCountry: newValue || null }));
    dispatch(
      countryCodeOnChangeAction({ countryCode: newValue?.countryCode || "" })
    );
    dispatch(
      countryNameOnChangeAction({ countryName: newValue?.countryName || "" })
    );
  };

  const handleCountryNameInputChange = (newInputValue) => {
    dispatch(countryNameOnChangeAction({ countryName: newInputValue }));
  };

  const handleFirstNameInputChange = (e) => {
    dispatch(firstNameOnChangeAction({ firstName: e.target.value }));
  };

  const handleLastNameInputChange = (e) => {
    dispatch(lastNameOnChangeAction({ lastName: e.target.value }));
  };

  const handleConfirmClick = () => {
    dispatch(createNewUserController());
  };

  const authComponent = ((props) => {
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
    authenticationProgress,
    countries,
    countryCode,
    countryName,
    firstName,
    lastName,
    onBackClick: handleBackClick,
    onConfirmClick: handleConfirmClick,
    onCountryCodeInputChange: handleCountryCodeInputChange,
    onCountryNameAutocompleteInputChange:
      handleCountryNameAutocompleteInputChange,
    onCountryNameInputChange: handleCountryNameInputChange,
    onFirstNameChangeInputChange: handleFirstNameInputChange,
    onLastNameInputChange: handleLastNameInputChange,
    onPhoneNumberInputChange: handlePhoneNumberInputChange,
    onSignInClick: handleSignInClick,
    onVerificationCodeInputChange: handleVerificationCodeInputChange,
    onVerifyClick: handleVerifyClick,
    phoneNumber,
    selectedCountry,
    verificationCode,
  });

  return (
    <>
      {authComponent}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
};

export default Authentication;
