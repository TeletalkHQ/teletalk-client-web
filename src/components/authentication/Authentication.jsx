import { useEffect } from "react";

import { tempActions } from "actions/tempActions";

import { arrayUtilities } from "classes/ArrayUtilities";
import { commonFunctionalities } from "classes/CommonFunctionalities";
import { domUtilities } from "classes/DomUtilities";
import { stringUtilities } from "classes/StringUtilities";

import Copyright from "components/utils/Copyright";
import NewUserProfile from "components/authentication/NewUserProfile";
import SignIn from "components/authentication/SignIn";
import VerifySignIn from "components/authentication/VerifySignIn";

import { createNewUserController } from "controllers/authControllers/createNewUserController";
import { getCountriesController } from "controllers/authControllers/getCountriesController";
import { signInController } from "controllers/authControllers/signInController";
import { verifySignInController } from "controllers/authControllers/verifySignInController";
import { welcomeMessageController } from "controllers/otherControllers/welcomeMessageController";

import { useMainContext } from "hooks/useMainContext";

import { VIEW_MODES } from "variables/otherVariables/constants";
import { elementNames } from "variables/initials/initialValues/elementNames";
import { validatorManager } from "classes/ValidatorManager";

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
    dispatch(getCountriesController());
    dispatch(welcomeMessageController());
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

  const handlePhoneNumberInputChange = (event) => {
    const { value } = event.target;

    validatorManager.validators.phoneNumberValidator
      .inputValidator(
        {
          phoneNumber: value,
        },
        value
      )
      .printError()
      .execute(() =>
        dispatch(phoneNumberOnChangeAction({ phoneNumber: value }))
      );
  };

  const handleCountryCodeInputChange = (event) => {
    const { value } = event.target;

    validatorManager.validators.countryCodeValidator
      .inputValidator(
        {
          countryCode: value,
        },
        value
      )
      .printError()
      .execute(() => {
        dispatch(countryCodeOnChangeAction({ countryCode: value }));

        const country =
          arrayUtilities.findByPropValueEquality(
            countries,
            value,
            "countryCode"
          ) || null;

        dispatch(selectedCountryAction({ selectedCountry: country }));
      });
  };

  const handleVerificationCodeInputChange = (event) => {
    const { value } = event.target;

    validatorManager.validators.verificationCodeValidator
      .inputValidator(
        {
          verificationCode: value,
        },
        value
      )
      .printError()
      .execute(() =>
        dispatch(verificationCodeOnChangeAction({ verificationCode: value }))
      );
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
