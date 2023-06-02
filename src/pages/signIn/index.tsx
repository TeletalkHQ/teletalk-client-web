import { useEffect } from "react";

import { Box } from "~/components/general/box";
import { Icons } from "~/components/other/Icons";
import { Input } from "~/components/general/input";
import AuthFooter from "~/components/other/AuthFooter";
import Avatar from "~/components/general/other/Avatar";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import H5 from "~/components/general/typography/header/H5";
import LoadingButton from "~/components/auth/LoadingButton";

import { controllers } from "~/controllers";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "~/store/actions";

import { variables } from "~/variables";

const SignIn = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const fn = async () => {
      dispatch(controllers.getCountries());
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignInClick = () => {
    dispatch(controllers.signIn());
  };

  const handlePhoneNumberInputChange = (event) => {
    const { value } = event.target;
    dispatch(actions.phoneNumberOnChange({ phoneNumber: value }));
  };

  const handleCountryCodeInputChange = (value) => {
    dispatch(actions.countryCodeOnChange({ countryCode: value }));
  };

  const handleSelectedCountryByCountryCodeInput = (value) => {
    const country = state.other.countries.find((i) => i.countryCode === value);

    selectedCountryDispatcher(country);
  };

  const handleSelectedCountryChange = (newValue) => {
    const country = newValue || variables.common.object.country();

    selectedCountryDispatcher(country);

    dispatch(actions.countryCodeOnChange({ countryCode: country.countryCode }));

    dispatch(actions.countryNameOnChange({ countryName: country.countryName }));
  };

  const handleCountryNameInputChange = (newInputValue) => {
    dispatch(actions.countryNameOnChange({ countryName: newInputValue }));
  };

  const selectedCountryDispatcher = (
    country = variables.common.object.country()
  ) => {
    dispatch(
      actions.selectedCountry({
        selectedCountry: country,
      })
    );
  };

  const isSignInSubmitButtonDisabled = () => {
    // const validateResult = commonTasks.validateInputValueLengthByModel(
    //   stuffStore.models.phoneNumber,
    //   state.auth.phoneNumber
    // );

    // return (
    //   !validateResult ||
    //   !utilities.isCountrySelected(state.auth.selectedCountry)
    // );

    return false;
  };

  return (
    <Box.Container mw="xl">
      <Box.Flex mt={8} ai="center" col>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
              countries={state.other.countries}
              countryCode={state.auth.countryCode}
              countryName={state.auth.countryName}
              onCountryCodeInputChange={({ target: { value } }) => {
                handleCountryCodeInputChange(value);
                handleSelectedCountryByCountryCodeInput(value);
              }}
              onCountryNameInputChange={handleCountryNameInputChange}
              onPhoneNumberInputChange={handlePhoneNumberInputChange}
              onSelectedCountryChange={handleSelectedCountryChange}
              phoneNumber={state.auth.phoneNumber}
              selectedCountry={state.auth.selectedCountry}
            />

            <LoadingButton
              buttonValue={"Next"}
              onClick={handleSignInClick}
              indicatorValue={"sign in..."}
              disabled={isSignInSubmitButtonDisabled()}
              loading={state.global.appProgressions.authenticationProgress}
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
