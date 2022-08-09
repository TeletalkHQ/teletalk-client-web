import { Avatar, Typography, Container, CircularProgress } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

import { stringUtilities } from "classes/StringUtilities";

import CountrySelector from "components/others/CountrySelector";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Container maxWidth="xs">
          <CustomBox style={{ marginTop: 1 }}>
            <Typography component="p" variant="p" color="GrayText">
              Please verify your country code and enter your mobile phone
              number.
            </Typography>

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
