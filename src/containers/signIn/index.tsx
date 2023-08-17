import { Input } from "~/components";
import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import H5 from "~/components/general/typography/header/H5";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { useSignIn } from "~/hooks";
import { useAuthStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

const SignIn = () => {
  const authStore = useAuthStore();
  const { updater, loading } = useSignIn();

  const isSignInSubmitButtonDisabled = () =>
    utils.isCellphoneValid(
      authStore.countryCode,
      authStore.countryName,
      authStore.phoneNumber
    );

  const handleChange: OnChangeValidatorFn = (_value: string, event) => {
    authStore.updateCellphone({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box.Container mw="xl">
      <Box.Flex mt={8} ai="center" col>
        <Avatar
          sx={(theme) => ({
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          })}
        >
          <Icons.LockOutlined.Icon />
        </Avatar>

        <H5>Teletalk</H5>

        <Box.Container mw="xs">
          <Box.Div style={{ marginTop: 1 }}>
            <GreyTextParagraph>
              Please verify your country code and enter your mobile phone
              number.
            </GreyTextParagraph>

            <Input.Cellphone
              countryCode={authStore.countryCode}
              countryName={authStore.countryName}
              onChange={handleChange}
              phoneNumber={authStore.phoneNumber}
            />

            <Input.LoadingButton
              disabled={isSignInSubmitButtonDisabled()}
              loading={loading}
              loadingIndicatorText="Sign in..."
              onClick={updater}
              sx={{
                mb: 1,
                mt: 2,
              }}
            >
              Next
            </Input.LoadingButton>
          </Box.Div>
        </Box.Container>
      </Box.Flex>

      <AuthFooter />
    </Box.Container>
  );
};

export default SignIn;
