import LoadingButton from "~/components/auth/LoadingButton";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import Avatar from "~/components/general/other/Avatar";
import IconButton from "~/components/general/other/IconButton";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import H5 from "~/components/general/typography/header/H5";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { useCustomRouter } from "~/hooks/useCustomRouter";
import { useVerify } from "~/hooks/useVerify";
import { useAuthStore } from "~/store";
import { utils } from "~/utils";

const Verify = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { updater } = useVerify();

  const isVerificationSubmitButtonDisabled = () => {
    return !utils.isValueLengthEqualToLength(
      "verificationCode",
      authStore.verificationCode
    );
  };

  const handleBackToSignInClick = () => {
    authStore.updateVerificationCode("");
    router.back();
  };

  const handleVerificationCodeInputChange = utils.createOnChangeValidator(
    "verificationCode",
    (value: string) => {
      authStore.updateVerificationCode(value);
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
              +{authStore.countryCode} {authStore.phoneNumber}
            </H5>

            <GreyTextParagraph>
              We have sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <Input.Text
              required
              label="Verification Code"
              name="verificationCode"
              autoFocus
              value={authStore.verificationCode}
              onChange={({ target: { value } }) =>
                handleVerificationCodeInputChange(value)
              }
            />

            <LoadingButton
              disabled={isVerificationSubmitButtonDisabled()}
              loading={authStore.authenticationProgress}
              onClick={updater}
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
