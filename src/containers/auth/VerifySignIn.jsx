import { domUtilities } from "utility-store/src/classes/DomUtilities";

import { actions } from "store/actions";

import { commonTasks } from "classes/CommonTasks";
import { stuffStore } from "classes/StuffStore";
import { validatorManager } from "classes/ValidatorManager";

import CustomAvatar from "components/general/other/CustomAvatar";
import CustomBox from "components/general/box/CustomBox";
import CustomButton from "components/general/input/CustomButton";
import CustomContainer from "components/general/box/CustomContainer";
import CustomIconButton from "components/general/other/CustomIconButton";
import CustomTextInput from "components/general/input/CustomTextInput";
import GreyTextParagraph from "components/general/typography/GreyTextParagraph";
import H5 from "components/general/header/H5";
import { Icons } from "components/other/Icons";

import { controllers } from "controllers";

import { useMainContext } from "hooks/useMainContext";

import { variables } from "variables";

const VerifySignIn = ({ onBackToSignInClick }) => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const isVerificationSubmitButtonDisabled = () => {
    return !commonTasks.validateInputValueLengthByModelLength(
      stuffStore.models.verificationCode,
      state.auth.verificationCode
    );
  };

  const handleVerifySignInClick = () => {
    domUtilities
      .setElementByName(variables.other.helper.ELEMENT_NAMES.VERIFICATION_CODE)
      .focusElement()
      .selectAllValue();
    dispatch(controllers.verifySignIn());
  };

  const handleVerificationCodeInputChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();

    validatorManager.validators.verificationCode
      .inputValidator(
        variables.other.helper.VALIDATION_KEYS.verificationCode,
        trimmedValue
      )
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
              +{state.auth.countryCode} {state.auth.phoneNumber}
            </H5>

            <GreyTextParagraph>
              We've sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <CustomTextInput
              required
              label="Verification code"
              name={variables.other.helper.ELEMENT_NAMES.VERIFICATION_CODE}
              autoFocus
              value={state.auth.verificationCode}
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
