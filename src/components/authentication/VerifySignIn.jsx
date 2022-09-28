import { domUtilities } from "utility-store/src/classes/DomUtilities";
import { stringUtilities } from "utility-store/src/classes/StringUtilities";

import { actions } from "actions/actions";

import { stuffStore } from "classes/StuffStore";
import { validatorManager } from "classes/ValidatorManager";

import CustomAvatar from "components/generals/otherGeneralComponents/CustomAvatar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomContainer from "components/generals/boxes/CustomContainer";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import H5 from "components/generals/typographies/H5";

import { verifySignInController } from "controllers/authControllers/verifySignInController";

import { useMainContext } from "hooks/useMainContext";

import { appIcons } from "variables/initials/initialValues/appIcons";
import {
  ELEMENT_NAMES,
  VALIDATION_KEYS,
} from "variables/otherVariables/constants";

const VerifySignIn = ({ onBackToSignInClick }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: {
        appProgressions: { authenticationProgress },
      },
      tempState: { countryCode, phoneNumber, verificationCode },
    },
  } = useMainContext();

  const isVerificationSubmitButtonDisabled = () => {
    const {
      verificationCodeModel: {
        length: { value: verificationCodeLength },
      },
    } = stuffStore.models;

    return (
      stringUtilities.valueLength(verificationCode) !== verificationCodeLength
    );
  };

  const handleVerifySignInClick = () => {
    domUtilities
      .setElementByName(ELEMENT_NAMES.VERIFICATION_CODE)
      .focusElement()
      .selectAllValue();
    dispatch(verifySignInController());
  };

  const handleVerificationCodeInputChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();

    validatorManager.validators.verificationCodeValidator
      .inputValidator(VALIDATION_KEYS.verificationCode, trimmedValue)
      .printInputValidatorError()
      .executeIfNoError(() =>
        dispatch(
          actions.verificationCodeOnChange({
            verificationCode: trimmedValue,
          })
        )
      );
  };

  return (
    <CustomContainer maxWidth="xl">
      <CustomBox sx={{ mt: 1 }}>
        <CustomIconButton onClick={onBackToSignInClick}>
          <appIcons.arrowBack.Icon />
        </CustomIconButton>
      </CustomBox>
      <CustomBox
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CustomAvatar sx={{ m: 1, bgcolor: "secondary.secondary" }}>
          <appIcons.verifiedUser.Icon />
        </CustomAvatar>
        <CustomContainer maxWidth="xs">
          <CustomBox sx={{ mt: 1 }}>
            <H5>
              +{countryCode} {phoneNumber}
            </H5>

            <GreyTextParagraph>
              We've sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <CustomTextInput
              required
              label="Verification code"
              name={ELEMENT_NAMES.VERIFICATION_CODE}
              autoFocus
              value={verificationCode}
              onChange={handleVerificationCodeInputChange}
            />

            <CustomButton
              lbtn
              disabled={isVerificationSubmitButtonDisabled()}
              loading={authenticationProgress}
              loadingPosition="end"
              onClick={handleVerifySignInClick}
              endIcon={<appIcons.fingerprint.Icon />}
              sx={{ mt: 2, mb: 2 }}
            >
              Verify
            </CustomButton>
          </CustomBox>
        </CustomContainer>
      </CustomBox>
    </CustomContainer>
  );
};

export default VerifySignIn;
