import { Avatar, Container, IconButton, Typography } from "@mui/material";
import { VerifiedUser, ArrowBack, Fingerprint } from "@mui/icons-material";

import CustomButton from "components/generals/inputs/CustomButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import CustomBox from "components/generals/boxes/CustomBox";

import { elementNames } from "variables/initials/initialValues/elementNames";

const VerifySignIn = ({
  countryCode,
  loading,
  onBackClick,
  onVerifyClick,
  onVerifyCodeChange,
  phoneNumber,
  verifyCode,
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
            <Typography
              component="h5"
              variant="h5"
              sx={{ textAlign: "center", fontWeight: "900" }}
            >
              +{countryCode} {phoneNumber}
            </Typography>

            <Typography component="p" variant="p" color="GrayText">
              We've sent the code to the Teletalk app to your phone number.
            </Typography>

            <CustomTextInput
              required
              label="Verification code"
              name={elementNames.verifyCode}
              autoFocus
              value={verifyCode}
              onChange={onVerifyCodeChange}
            />

            <CustomButton
              lbtn
              loading={loading}
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
