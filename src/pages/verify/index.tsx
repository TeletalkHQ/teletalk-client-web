import { domUtilities } from "utility-store";

import { validatorManager } from "~/classes/validator/ValidatorManager";

import Box from "~/components/general/box";

import { Icons } from "~/components/other/Icons";
import { Input } from "~/components/general/input";
import AuthFooter from "~/components/other/AuthFooter";
import Avatar from "~/components/general/other/Avatar";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import H5 from "~/components/general/typography/header/H5";
import IconButton from "~/components/general/other/IconButton";
import LoadingButton from "~/components/auth/LoadingButton";

import { controllers } from "~/controllers";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";

const Verify = () => {
  const isVerificationSubmitButtonDisabled = () => {
    // return !commonTasks.validateInputValueLengthByModelLength(
    //   stuffStore.models.verificationCode,
    //   state.auth.verificationCode
    // );

    return false;
  };

  const handleBackToSignInClick = () => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
    dispatch(commonActions.changeViewMode.signIn());
  };

  const handleVerifyClick = () => {
    domUtilities()
      //REFACTOR: Use ElementName type
      .setElementByName("verificationCode")
      .focusElement()
      .selectAllValue();
    dispatch(controllers.verify());
  };

  const handleVerificationCodeInputChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();

    validatorManager.validators.verificationCode
      .inputValidator("verificationCode", trimmedValue)
      .checkErrors()
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
              label="Verification Code"
              name="verificationCode"
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
