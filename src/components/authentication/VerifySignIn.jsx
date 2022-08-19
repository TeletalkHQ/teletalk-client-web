import CustomAvatar from "components/generals/otherGeneralComponents/CustomAvatar";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomContainer from "components/generals/boxes/CustomContainer";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import H5 from "components/generals/typographies/H5";

import { appIcons } from "variables/initials/initialValues/appIcons";
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
    <CustomContainer maxWidth="xl">
      <CustomBox sx={{ mt: 1 }}>
        <CustomIconButton onClick={onBackClick}>
          <appIcons.arrowBack.Icon />
        </CustomIconButton>
      </CustomBox>
      <CustomBox
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CustomAvatar sx={{ m: 1, bgcolor: "secondary.secondary" }}>
          <appIcons.verifiedUser.Icon />
        </CustomAvatar>
        <CustomContainer maxWidth="xs">
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
              endIcon={<appIcons.fingerprint.Icon />}
              sx={{ mt: 2, mb: 2 }}
            >
              Verify
            </CustomButton>
          </CustomBox>
        </CustomContainer>
      </CustomBox>
    </CustomContainer>
  );
};

export default VerifySignIn;
