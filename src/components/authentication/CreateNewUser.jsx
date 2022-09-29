import { actions } from "actions/actions";

import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomContainer from "components/generals/boxes/CustomContainer";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import FirstName from "components/commonInputs/FirstNameInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import LastName from "components/commonInputs/LastNameInput";

import { controllers } from "controllers/controllers";

import { useMainContext } from "hooks/useMainContext";

import { appIcons } from "variables/initials/initialValues/appIcons";

const CreateNewUser = ({ onBackToSignInClick }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      global: {
        appProgressions: { authenticationProgress },
      },
      temp: { firstName, lastName },
    },
  } = useMainContext();

  const handleFirstNameInputChange = (e) => {
    dispatch(actions.firstNameOnChange({ firstName: e.target.value }));
  };

  const handleLastNameInputChange = (e) => {
    dispatch(actions.lastNameOnChange({ lastName: e.target.value }));
  };

  const handleCreateNewUserConfirmClick = () => {
    dispatch(controllers.createNewUser());
  };

  return (
    <CustomContainer mw="xl">
      <CustomBox sx={{ mt: 1 }}>
        <CustomIconButton onClick={onBackToSignInClick}>
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
          <FirstName.WithValidator
            inputValue={firstName}
            onInputChange={handleFirstNameInputChange}
          />
          <LastName.WithValidator
            inputValue={lastName}
            onInputChange={handleLastNameInputChange}
          />

          <CustomButton
            loading={authenticationProgress}
            loadingPosition="end"
            onClick={handleCreateNewUserConfirmClick}
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

export default CreateNewUser;
