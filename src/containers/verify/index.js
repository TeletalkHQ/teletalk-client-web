import { domUtilities } from "utility-store/src/classes/DomUtilities";

import { commonTasks } from "src/classes/CommonTasks";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/validator/ValidatorManager";

import { Box } from "src/components/general/box";
import { Icons } from "src/components/other/Icons";
import { Input } from "src/components/general/input";
import AuthFooter from "src/components/other/AuthFooter";
import Avatar from "src/components/general/other/Avatar";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import H5 from "src/components/general/typography/header/H5";
import IconButton from "src/components/general/other/IconButton";
import LoadingButton from "src/components/auth/LoadingButton";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

import { variables } from "src/variables";

const Verify = () => {
  const dispatch = useDispatch();
  const state = useSelector();

  const isVerificationSubmitButtonDisabled = () => {
    return !commonTasks.validateInputValueLengthByModelLength(
      stuffStore.models.verificationCode,
      state.auth.verificationCode
    );
  };

  const handleBackToSignInClick = () => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
    dispatch(commonActions.changeViewMode.signIn());
  };

  const handleVerifyClick = () => {
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
    <Box.Container maxWidth="xl">
      <Box.Div style={{ mt: 1 }}>
        <IconButton onClick={handleBackToSignInClick}>
          <Icons.ArrowBack.Icon />
        </IconButton>
      </Box.Div>
      <Box.Div
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.secondary" }}>
          <Icons.VerifiedUser.Icon />
        </Avatar>
        <Box.Container maxWidth="xs">
          <Box.Div style={{ mt: 1 }}>
            <H5>
              +{state.auth.countryCode} {state.auth.phoneNumber}
            </H5>

            <GreyTextParagraph>
              We've sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <Input.Text
              required
              label={variables.other.helper.ELEMENT_LABELS.VERIFICATION_CODE}
              name={variables.other.helper.ELEMENT_NAMES.VERIFICATION_CODE}
              autoFocus
              value={state.auth.verificationCode}
              onChange={handleVerificationCodeInputChange}
            />

            <LoadingButton
              disabled={isVerificationSubmitButtonDisabled()}
              loading={state.global.appProgressions.authenticationProgress}
              onClick={handleVerifyClick}
              sx={{ mt: 2, mb: 2 }}
              buttonValue={"Verify"}
              indicatorValue={"Verifying..."}
            />
          </Box.Div>
        </Box.Container>
      </Box.Div>

      <AuthFooter />
    </Box.Container>
  );
};

export default Verify;
