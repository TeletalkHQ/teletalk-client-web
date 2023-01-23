import { domUtilities } from "utility-store/src/classes/DomUtilities";

import { commonTasks } from "src/classes/CommonTasks";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/validator/ValidatorManager";

import CustomAvatar from "src/components/general/other/CustomAvatar";
import CustomBox from "src/components/general/box/CustomBox";
import CustomButton from "src/components/general/input/CustomButton";
import CustomContainer from "src/components/general/box/CustomContainer";
import CustomIconButton from "src/components/general/other/CustomIconButton";
import CustomTextInput from "src/components/general/input/CustomTextInput";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import H5 from "src/components/general/header/H5";
import { Icons } from "src/components/other/Icons";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";

import { variables } from "src/variables";

const VerifySignIn = ({ onBackToSignInClick }) => {
  const dispatch = useDispatch();
  const state = useSelector();

  const isVerificationSubmitButtonDisabled = () => {
    return !commonTasks.validateInputValueLengthByModelLength(
      stuffStore.models.verificationCode,
      state.auth.verificationCode
    );
  };

  const handleVerifySignInClick = () => {
    domUtilities()
      .setElementByName(variables.other.helper.ELEMENT_NAMES.VERIFICATION_CODE)
      .focusElement()
      .selectAllValue();
    dispatch(controllers.verify());
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
              label={variables.other.helper.ELEMENT_LABELS.VERIFICATION_CODE}
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
