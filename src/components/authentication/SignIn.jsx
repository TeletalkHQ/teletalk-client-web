import { stringUtilities } from "classes/StringUtilities";

import CountrySelector from "components/otherComponents/CountrySelector";
import CustomAvatar from "components/generals/otherGeneralComponents/CustomAvatar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomCircularProgress from "components/generals/progresses/CustomCircularProgress";
import CustomContainer from "components/generals/boxes/CustomContainer";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import H5 from "components/generals/typographies/H5";

import { appIcons } from "variables/initials/initialValues/appIcons";
import { elementNames } from "variables/initials/initialValues/elementNames";

const SignIn = ({
  authenticationProgress,
  countries,
  countryCode,
  countryName,
  onCountryCodeChange,
  onCountryNameAutocompleteOnchange,
  onCountryNameOnInputChange,
  onPhoneNumberChange,
  onSignInClick,
  phoneNumber,
  selectedCountry,
}) => {
  return (
    <CustomContainer mw="xl">
      <CustomFlexBox mt={8} ai="center" col>
        <CustomAvatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <appIcons.lockOutlined.Icon />
        </CustomAvatar>
        <H5>Sign in</H5>
        <CustomContainer mw="xs">
          <CustomBox style={{ marginTop: 1 }}>
            <GreyTextParagraph>
              Please verify your country code and enter your mobile phone
              number.
            </GreyTextParagraph>

            {countries && (
              <CountrySelector
                countries={countries}
                countryName={countryName}
                onCountryNameAutocompleteOnchange={
                  onCountryNameAutocompleteOnchange
                }
                onCountryNameOnInputChange={onCountryNameOnInputChange}
                selectedCountry={selectedCountry}
              />
            )}

            <CustomFlexBox jc="space-between">
              <CustomTextInput
                style={{ width: "90px" }}
                required
                label="Code"
                name={elementNames.countryCode}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <>
                      <span>+</span>
                    </>
                  ),
                }}
                value={countryCode}
                onChange={onCountryCodeChange}
              />
              <CustomTextInput
                required
                label="Phone number"
                name={elementNames.phoneNumber}
                autoComplete="tel-national"
                style={{ marginLeft: "5px" }}
                value={phoneNumber}
                onChange={onPhoneNumberChange}
              />
            </CustomFlexBox>

            <CustomButton
              lbtn
              disabled={
                stringUtilities.valueLength(phoneNumber) < 9 || !selectedCountry
              }
              loading={authenticationProgress}
              loadingIndicator={
                <>
                  <span>Please wait...</span> &nbsp;&nbsp;
                  <CustomCircularProgress size={25} color="info" />
                </>
              }
              onClick={onSignInClick}
              sx={{ mt: 2, mb: 1, borderRadius: "10px" }}
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
