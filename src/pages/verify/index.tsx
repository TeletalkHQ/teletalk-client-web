import { useRouter } from "next/router";

import { commonTasks } from "~/classes/CommonTasks";
import { domUtils } from "~/classes/DomUtils";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import LoadingButton from "~/components/auth/LoadingButton";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import Avatar from "~/components/general/other/Avatar";
import IconButton from "~/components/general/other/IconButton";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import H5 from "~/components/general/typography/header/H5";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { createInputValidator } from "~/helpers/createInputValidator";
import { useAuthStore } from "~/store";
import { VerifyIO } from "~/types";

const Verify = () => {
  const state = useAuthStore();
  const router = useRouter();

  const isVerificationSubmitButtonDisabled = () => {
    return !commonTasks.isValueLengthEqualToLength(
      "verificationCode",
      state.verificationCode
    );
  };

  const handleBackToSignInClick = () => {
    state.updateVerificationCode("");
    router.back();
  };

  const handleVerifyClick = async () => {
    domUtils()
      .setElementByName("verificationCode")
      .focusElement()
      .selectAllValue();

    state.updateAuthenticationProgress(true);

    await socketEmitterStore.events.verify.emitFull<VerifyIO>(
      {
        verificationCode: state.verificationCode,
      },
      async ({ data }) => {
        state.updateVerificationCode("");
        state.updateAuthenticationProgress(false);

        if (data.newUser) router.replace("create");
        else router.push("messenger");

        return data;
      }
    );
  };

  const handleVerificationCodeInputChange = createInputValidator(
    "verificationCode",
    (value: string) => {
      state.updateVerificationCode(value);
    }
  );

  return (
    <Box.Container maxWidth="xl">
      <Box.Div style={{ marginTop: 1 }}>
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
        <Avatar
          sx={(theme) => ({
            m: 1,
            backgroundColor: theme.palette.secondary.dark,
          })}
        >
          <Icons.VerifiedUser.Icon />
        </Avatar>
        <Box.Container maxWidth="xs">
          <Box.Div style={{ marginTop: 1 }}>
            <H5>
              +{state.countryCode} {state.phoneNumber}
            </H5>

            <GreyTextParagraph>
              We have sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <Input.Text
              required
              label="Verification Code"
              name="verificationCode"
              autoFocus
              value={state.verificationCode}
              onChange={({ target: { value } }) =>
                handleVerificationCodeInputChange(value)
              }
            />

            <LoadingButton
              disabled={isVerificationSubmitButtonDisabled()}
              loading={state.authenticationProgress}
              onClick={handleVerifyClick}
              sx={{ mt: 2, mb: 2 }}
              buttonValue="Verify"
              indicatorValue="Verifying..."
            />
          </Box.Div>
        </Box.Container>
      </Box.Div>

      <AuthFooter />
    </Box.Container>
  );
};

export default Verify;
