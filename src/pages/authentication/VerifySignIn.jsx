import { domUtilities } from "utility-store/src/classes/DomUtilities";

import { actions } from "actions/actions";

import { commonJobsHandler } from "classes/CommonJobsHandler";
import { stuffStore } from "classes/StuffStore";
import { validatorManager } from "classes/ValidatorManager";

import CustomAvatar from "components/generals/otherGeneralComponents/CustomAvatar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomContainer from "components/generals/boxes/CustomContainer";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import H5 from "components/generals/headers/H5";

import { controllers } from "controllers";

import { useMainContext } from "hooks/useMainContext";

import { Icons } from "components/others/Icons";
import {
  ELEMENT_NAMES,
  VALIDATION_KEYS,
} from "variables/otherVariables/helpers";

const VerifySignIn = ({ onBackToSignInClick }) => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const isVerificationSubmitButtonDisabled = () => {
    return !commonJobsHandler.validateInputValueLengthByModelLength(
      stuffStore.models.verificationCode,
      state.temp.verificationCode
    );
  };

  const handleVerifySignInClick = () => {
    domUtilities
      .setElementByName(ELEMENT_NAMES.VERIFICATION_CODE)
      .focusElement()
      .selectAllValue();
    dispatch(controllers.verifySignIn());
  };

  const handleVerificationCodeInputChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();

    validatorManager.validators.verificationCode
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
          <Icons.ArrowBack.Icon />
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
          <Icons.VerifiedUser.Icon />
        </CustomAvatar>
        <CustomContainer maxWidth="xs">
          <CustomBox sx={{ mt: 1 }}>
            <H5>
              +{state.temp.countryCode} {state.temp.phoneNumber}
            </H5>

            <GreyTextParagraph>
              We've sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <CustomTextInput
              required
              label="Verification code"
              name={ELEMENT_NAMES.VERIFICATION_CODE}
              autoFocus
              value={state.temp.verificationCode}
              onChange={handleVerificationCodeInputChange}
            />

            <CustomButton
              lbtn
              disabled={isVerificationSubmitButtonDisabled()}
              loading={state.global.appProgressions.authenticationProgress}
              loadingPosition="end"
              onClick={handleVerifySignInClick}
              endIcon={<Icons.Fingerprint.Icon />}
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
