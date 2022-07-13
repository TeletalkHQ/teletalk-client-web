import { AccountCircleOutlined, ArrowBack, Check } from "@mui/icons-material";
import { Container, IconButton, Typography } from "@mui/material";

import CustomButton from "components/generals/inputs/CustomButton";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import CustomBox from "components/generals/boxes/CustomBox";

import { elementNames } from "variables/initials/initialValues/elementNames";

const NewUserProfile = ({
  firstNameInput,
  lastNameInput,
  loading,
  onBackClick,
  onConfirmClick,
  onFirstNameOnChange,
  onLastNameOnChange,
}) => {
  return (
    <Container maxWidth="xl">
      <CustomBox sx={{ mt: 1 }}>
        <IconButton onClick={onBackClick}>
          <ArrowBack />
        </IconButton>
      </CustomBox>
      <CustomFlexBox sx={{ marginTop: 8 }} col ai="center">
        <CustomBox>
          <AccountCircleOutlined fontSize="large" color="primary" />
        </CustomBox>
        <Container maxWidth="xs">
          <Typography component="p" variant="p" color="GrayText">
            Please enter this information to complete your account creation.
          </Typography>
          <CustomTextInput
            required
            id="firstNameInput"
            name={elementNames.firstName}
            autoFocus
            value={firstNameInput}
            onChange={onFirstNameOnChange}
            label="First Name"
          />
          <CustomTextInput
            required
            id="lastNameInput"
            name={elementNames.lastName}
            value={lastNameInput}
            onChange={onLastNameOnChange}
            label="Last Name"
          />

          <CustomButton
            loading={loading}
            loadingPosition="end"
            onClick={onConfirmClick}
            endIcon={<Check />}
            sx={{ mt: 1 }}
          >
            Confirm
          </CustomButton>
        </Container>
      </CustomFlexBox>
    </Container>
  );
};

export default NewUserProfile;
