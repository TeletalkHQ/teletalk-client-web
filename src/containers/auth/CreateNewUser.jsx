import { commonTasks } from "src/classes/CommonTasks";
import { stuffStore } from "src/classes/StuffStore";

import CustomBox from "src/components/general/box/CustomBox";
import CustomButton from "src/components/general/input/CustomButton";
import CustomContainer from "src/components/general/box/CustomContainer";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import CustomIconButton from "src/components/general/other/CustomIconButton";
import FirstName from "src/components/general/input/commonInput/FirstNameInput";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import LastName from "src/components/general/input/commonInput/LastNameInput";
import { Icons } from "src/components/other/Icons";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";

const CreateNewUser = ({ onBackToSignInClick }) => {
  const dispatch = useDispatch();
  const state = useSelector();

  const handleFirstNameInputChange = (e) => {
    dispatch(actions.firstNameOnChange({ firstName: e.target.value }));
  };

  const handleLastNameInputChange = (e) => {
    dispatch(actions.lastNameOnChange({ lastName: e.target.value }));
  };

  const handleCreateNewUserConfirmClick = () => {
    dispatch(controllers.createUser());
  };

  const isCreateNewUserConfirmButtonDisabled = () => {
    const firstNameValidateResult =
      commonTasks.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.firstName,
        state.auth.firstName
      );

    const lastNameValidateResult =
      commonTasks.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.lastName,
        state.auth.lastName
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
            inputValue={state.auth.firstName}
            onInputChange={handleFirstNameInputChange}
          />
          <LastName.WithValidator
            inputValue={state.auth.lastName}
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
