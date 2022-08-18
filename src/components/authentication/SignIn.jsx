import { Avatar, Container, CircularProgress } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

import { stringUtilities } from "classes/StringUtilities";

import CountrySelector from "components/others/CountrySelector";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import H5 from "components/generals/typographies/H5";

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
    <Container maxWidth="xl">
      <CustomFlexBox mt={8} ai="center" col>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <H5>Sign in</H5>
        <Container maxWidth="xs">
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
                  <CircularProgress size={25} color="info" />
                </>
              }
              onClick={onSignInClick}
              sx={{ mt: 2, mb: 1, borderRadius: "10px" }}
            >
              Next
            </CustomButton>
          </CustomBox>
        </Container>
      </CustomFlexBox>
    </Container>
  );
};

export default SignIn;
