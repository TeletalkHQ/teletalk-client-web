import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { stuffStore } from "src/classes/StuffStore";
import { commonTasks } from "src/classes/CommonTasks";

import { Icons } from "src/components/other/Icons";
import CountryCode from "src/components/general/input/commonInput/CountryCode";
import CountrySelector from "src/components/general/input/commonInput/CountrySelector";
import CustomAvatar from "src/components/general/other/CustomAvatar";
import CustomBox from "src/components/general/box/CustomBox";
import CustomButton from "src/components/general/input/CustomButton";
import CustomCircularProgress from "src/components/general/progress/CustomCircularProgress";
import CustomContainer from "src/components/general/box/CustomContainer";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import H5 from "src/components/general/header/H5";
import PhoneNumber from "src/components/general/input/commonInput/PhoneNumberInput";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";

import { variables } from "src/variables";

const SignIn = () => {
  const dispatch = useDispatch();
  const state = useSelector();

  const isCountrySelected = () => {
    const country = state.auth.selectedCountry;

    return !!(
      country.countryCode &&
      country.countryName &&
      country.countryShortName
    );
  };

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
      //TODO: Read from statics
      "countryCode"
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

    return !validateResult || !isCountrySelected();
  };

  return (
    <CustomContainer mw="xl">
      <CustomFlexBox mt={8} ai="center" col>
        <CustomAvatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <Icons.LockOutlined.Icon />
        </CustomAvatar>
        <H5>Teletalk</H5>
        <CustomContainer mw="xs">
          <CustomBox style={{ marginTop: 1 }}>
            <GreyTextParagraph>
              Please verify your country code and enter your mobile phone
              number.
            </GreyTextParagraph>

            <CountrySelector
              countries={state.other.countries}
              countryName={state.auth.countryName}
              onSelectedCountryChange={handleSelectedCountryChange}
              onCountryNameInputChange={handleCountryNameInputChange}
              selectedCountry={
                isCountrySelected() ? state.auth.selectedCountry : null
              }
            />

            <CustomFlexBox jc="space-between">
              <CountryCode.WithValidator
                inputValue={state.auth.countryCode}
                onInputChange={(event) => {
                  const { value } = event.target;
                  handleCountryCodeInputChange(value);
                  selectCountryByCountryCodeInputChange(value);
                }}
              />
              <PhoneNumber.WithValidator
                onInputChange={handlePhoneNumberInputChange}
                inputValue={state.auth.phoneNumber}
              />
            </CustomFlexBox>

            <CustomButton
              lbtn
              disabled={isSignInSubmitButtonDisabled()}
              loading={state.global.appProgressions.authenticationProgress}
              loadingIndicator={
                <>
                  <span>Please wait...</span> &nbsp;&nbsp;
                  <CustomCircularProgress size={25} color="info" />
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
            </CustomButton>
          </CustomBox>
        </CustomContainer>
      </CustomFlexBox>
    </CustomContainer>
  );
};

export default SignIn;
