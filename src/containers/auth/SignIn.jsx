import { useEffect } from "react";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { stuffStore } from "src/classes/StuffStore";
import { commonTasks } from "src/classes/CommonTasks";

import { Box } from "src/components/general/box";
import { Icons } from "src/components/other/Icons";
import CircularProgress from "src/components/general/progress/CircularProgress";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import H5 from "src/components/general/typography/header/H5";
import { Input } from "src/components/general/input";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";

import { variables } from "src/variables";
import { utilities } from "src/utilities";
import Avatar from "src/components/general/other/Avatar";

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

  const selectCountryByCountryCodeInputChange = (value) => {
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

            <Input.CountrySelector
              countries={state.other.countries}
              countryName={state.auth.countryName}
              onSelectedCountryChange={handleSelectedCountryChange}
              onCountryNameInputChange={handleCountryNameInputChange}
              selectedCountry={
                utilities.isCountrySelected(state.auth.selectedCountry)
                  ? state.auth.selectedCountry
                  : null
              }
            />

            <Box.Flex jc="space-between">
              <Input.CountryCode.WithValidator
                inputValue={state.auth.countryCode}
                onInputChange={(event) => {
                  const { value } = event.target;
                  handleCountryCodeInputChange(value);
                  selectCountryByCountryCodeInputChange(value);
                }}
              />
              <Input.PhoneNumber.WithValidator
                onInputChange={handlePhoneNumberInputChange}
                inputValue={state.auth.phoneNumber}
              />
            </Box.Flex>

            <Input.Button
              lbtn
              disabled={isSignInSubmitButtonDisabled()}
              loading={state.global.appProgressions.authenticationProgress}
              loadingIndicator={
                <>
                  <span>Please wait...</span> &nbsp;&nbsp;
                  <CircularProgress size={25} color="info" />
                </>
              }
              onClick={handleSignInClick}
              sx={{
                borderRadius: "10px",
                mb: 1,
                mt: 2,
              }}
            >
              Next
            </Input.Button>
          </Box.Div>
        </Box.Container>
      </Box.Flex>
    </Box.Container>
  );
};

export default SignIn;
