import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomContainer from "components/generals/boxes/CustomContainer";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";

import { elementNames } from "variables/initials/initialValues/elementNames";
import { appIcons } from "variables/initials/initialValues/appIcons";

const NewUserProfile = ({
  authenticationProgress,
  firstNameInput,
  lastNameInput,
  onBackClick,
  onConfirmClick,
  onFirstNameOnChange,
  onLastNameOnChange,
}) => {
  return (
    <CustomContainer mw="xl">
      <CustomBox sx={{ mt: 1 }}>
        <CustomIconButton onClick={onBackClick}>
          <appIcons.arrowBack.Icon />
        </CustomIconButton>
      </CustomBox>
      <CustomFlexBox sx={{ marginTop: 8 }} col ai="center">
        <CustomBox>
          <appIcons.accountCircle.Icon fontSize="large" color="primary" />
        </CustomBox>
        <CustomContainer mw="xs">
          <GreyTextParagraph>
            Please enter this information to complete your account creation.
          </GreyTextParagraph>
          <CustomTextInput
            required
            //TODO Add to elementIds
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
            loading={authenticationProgress}
            loadingPosition="end"
            onClick={onConfirmClick}
            endIcon={<appIcons.check.Icon />}
            sx={{ mt: 1 }}
          >
            Confirm
          </CustomButton>
        </CustomContainer>
      </CustomFlexBox>
    </CustomContainer>
  );
};

export default NewUserProfile;
