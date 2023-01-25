import { useEffect } from "react";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { stuffStore } from "src/classes/StuffStore";
import { commonTasks } from "src/classes/CommonTasks";

import { Box } from "src/components/general/box";
import { Icons } from "src/components/other/Icons";
import { Input } from "src/components/general/input";
import AuthFooter from "src/components/other/AuthFooter";
import Avatar from "src/components/general/other/Avatar";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import H5 from "src/components/general/typography/header/H5";
import LoadingButton from "src/components/auth/LoadingButton";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";

import { utilities } from "src/utilities";

import { variables } from "src/variables";

const SignIn = () => {
  const dispatch = useDispatch();
  const state = useSelector();

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
    const country = arrayUtilities.findByPropValueEquality(
      state.other.countries,
      value,
      variables.other.helper.PROPS.COUNTRY_CODE
    );

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
    const validateResult =
      commonTasks.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.phoneNumber,
        state.auth.phoneNumber
      );

    return (
      !validateResult ||
      !utilities.isCountrySelected(state.auth.selectedCountry)
    );
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
