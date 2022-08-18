import { Avatar, Container, IconButton } from "@mui/material";
import { VerifiedUser, ArrowBack, Fingerprint } from "@mui/icons-material";

import CustomButton from "components/generals/inputs/CustomButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import CustomBox from "components/generals/boxes/CustomBox";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import H5 from "components/generals/typographies/H5";

import { elementNames } from "variables/initials/initialValues/elementNames";

const VerifySignIn = ({
  authenticationProgress,
  countryCode,
  onBackClick,
  onVerificationCodeChange,
  onVerifyClick,
  phoneNumber,
  verificationCode,
}) => {
  return (
    <Container maxWidth="xl">
      <CustomBox sx={{ mt: 1 }}>
        <IconButton onClick={onBackClick}>
          <ArrowBack />
        </IconButton>
      </CustomBox>
      <CustomBox
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.secondary" }}>
          <VerifiedUser />
        </Avatar>
        <Container maxWidth="xs">
          <CustomBox sx={{ mt: 1 }}>
            <H5>
              +{countryCode} {phoneNumber}
            </H5>

            <GreyTextParagraph>
              We've sent the code to the Teletalk app to your phone number.
            </GreyTextParagraph>

            <CustomTextInput
              required
              label="Verification code"
              name={elementNames.verificationCode}
              autoFocus
              value={verificationCode}
              onChange={onVerificationCodeChange}
            />

            <CustomButton
              lbtn
              loading={authenticationProgress}
              loadingPosition="end"
              onClick={onVerifyClick}
              endIcon={<Fingerprint />}
              sx={{ mt: 2, mb: 2 }}
            >
              Verify
            </CustomButton>
          </CustomBox>
        </Container>
      </CustomBox>
    </Container>
  );
};

export default VerifySignIn;
