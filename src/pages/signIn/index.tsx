import { useRouter } from "next/router";

import { commonTasks } from "~/classes/CommonTasks";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import LoadingButton from "~/components/auth/LoadingButton";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import Avatar from "~/components/general/other/Avatar";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import H5 from "~/components/general/typography/header/H5";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { countries } from "~/data/countries";
import { createInputValidator } from "~/helpers/createInputValidator";
import { useAuthStore } from "~/store";
import { CountryItem, SignInIO } from "~/types";
import { utilities } from "~/utilities";

const SignIn = () => {
  const state = useAuthStore();
  const router = useRouter();

  const handleSignInClick = async () => {
    state.updateAuthenticationProgress(true);

    await socketEmitterStore.events.signIn.emitFull<SignInIO>(
      {
        countryCode: state.countryCode,
        countryName: state.countryName,
        phoneNumber: state.phoneNumber,
      },
      async ({ data }) => {
        state.updateAuthenticationProgress(false);
        router.push("verify");
        return data;
      }
    );
  };

  const handlePhoneNumberInputChange = createInputValidator(
    "phoneNumber",
    (value: string) => {
      state.updatePhoneNumber(value);
    }
  );

  const handleCountryCodeInputChange = createInputValidator(
    "countryCode",
    (value: string) => {
      state.updateCountryCode(value);
    }
  );

  const handleSelectedCountryByCountryCodeInput = (value: string) => {
    state.updateSelectedCountry(
      countries.find((i) => i.countryCode === value) || null
    );
  };

  const handleSelectedCountryChange = (value: CountryItem | null) => {
    state.updateSelectedCountry(value);
    state.updateCountryCode(value?.countryCode || "");
    state.updateCountryName(value?.countryName || "");
  };

  const handleCountryNameInputChange = createInputValidator(
    "countryName",
    (value: string) => {
      state.updateCountryName(value);
    }
  );

  const isSignInSubmitButtonDisabled = () => {
    const lengthCheckResult = commonTasks.isValueLengthInBetweenMinMax(
      "phoneNumber",
      state.phoneNumber
    );

    return (
      !lengthCheckResult || !utilities.isCountrySelected(state.selectedCountry)
    );
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
              countryCode={state.countryCode}
              countryName={state.countryName}
              onCountryCodeInputChange={({ target: { value } }) => {
                handleCountryCodeInputChange(value);
                handleSelectedCountryByCountryCodeInput(value);
              }}
              onCountryNameInputChange={handleCountryNameInputChange}
              onPhoneNumberInputChange={({ target: { value } }) =>
                handlePhoneNumberInputChange(value)
              }
              onSelectedCountryChange={handleSelectedCountryChange}
              phoneNumber={state.phoneNumber}
              selectedCountry={state.selectedCountry}
            />

            <LoadingButton
              buttonValue="Next"
              onClick={handleSignInClick}
              indicatorValue="Sign in..."
              disabled={isSignInSubmitButtonDisabled()}
              loading={state.authenticationProgress}
              sx={{
                mb: 1,
                mt: 2,
              }}
            />
          </Box.Div>
        </Box.Container>
      </Box.Flex>

      <AuthFooter />
    </Box.Container>
  );
};

export default SignIn;
