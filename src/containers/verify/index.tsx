import { Input } from "~/components";
import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
import IconButton from "~/components/general/other/IconButton";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import H5 from "~/components/general/typography/header/H5";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { useCustomRouter, useVerify } from "~/hooks";
import { useAuthStore } from "~/store";
import { validators } from "~/validators";

const Verify = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { updater, loading } = useVerify();

  const isVerifySubmitButtonDisabled = () =>
    validators.verificationCode
      .submitValidator()
      .checkValue(authStore.verificationCode).hasError;

  const handleBackToSignInClick = () => {
    authStore.updateVerificationCode("");
    router.back();
  };

  const handleVerificationCodeInputChange = (value: string) => {
    authStore.updateVerificationCode(value);
  };

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
              +{authStore.countryCode} {authStore.phoneNumber}
            </H5>

            <GreyTextParagraph>
              We have sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <Input.VerificationCode
              value={authStore.verificationCode}
              onChange={handleVerificationCodeInputChange}
            />

            <Input.LoadingButton
              disabled={isVerifySubmitButtonDisabled()}
              loading={loading}
              loadingIndicatorText="Verifying..."
              onClick={updater}
              sx={{
                mb: 2,
                mt: 2,
              }}
            >
              Verify
            </Input.LoadingButton>
          </Box.Div>
        </Box.Container>
      </Box.Div>

      <AuthFooter />
    </Box.Container>
  );
};

export default Verify;
