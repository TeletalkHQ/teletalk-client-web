import { actions } from "actions/actions";

import { stuffStore } from "classes/StuffStore";

import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomContainer from "components/generals/boxes/CustomContainer";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import FirstName from "components/commonInputs/FirstNameInput";
import GreyTextParagraph from "components/generals/typographies/GreyTextParagraph";
import LastName from "components/commonInputs/LastNameInput";

import { controllers } from "controllers";

import { useMainContext } from "hooks/useMainContext";

import { Icons } from "components/others/Icons";
import { commonJobsHandler } from "classes/CommonJobsHandler";

const CreateNewUser = ({ onBackToSignInClick }) => {
  const {
    hooksOutput: { dispatch },
    state,
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

  const isCreateNewUserConfirmButtonDisabled = () => {
    const firstNameValidateResult =
      commonJobsHandler.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.firstName,
        state.temp.firstName
      );

    const lastNameValidateResult =
      commonJobsHandler.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.lastName,
        state.temp.lastName
      );

    return !firstNameValidateResult || !lastNameValidateResult;
  };

  return (
    <CustomContainer mw="xl">
      <CustomBox
        sx={{
          mt: 1,
        }}
      >
        <CustomIconButton onClick={onBackToSignInClick}>
          <Icons.ArrowBack.Icon />
        </CustomIconButton>
      </CustomBox>
      <CustomFlexBox sx={{ marginTop: 8 }} col ai="center">
        <CustomBox>
          <Icons.AccountCircleOutlined.Icon fontSize="large" color="primary" />
        </CustomBox>
        <CustomContainer mw="xs">
          <GreyTextParagraph>
            Please enter this information to complete your account creation.
          </GreyTextParagraph>
          <FirstName.WithValidator
            inputValue={state.temp.firstName}
            onInputChange={handleFirstNameInputChange}
          />
          <LastName.WithValidator
            inputValue={state.temp.lastName}
            onInputChange={handleLastNameInputChange}
          />

          <CustomButton
            loading={state.global.appProgressions.authenticationProgress}
            loadingPosition="end"
            onClick={handleCreateNewUserConfirmClick}
            endIcon={<Icons.Check.Icon />}
            sx={{ mt: 1 }}
            disabled={isCreateNewUserConfirmButtonDisabled()}
          >
            Confirm
          </CustomButton>
        </CustomContainer>
      </CustomFlexBox>
    </CustomContainer>
  );
};

export default CreateNewUser;
