import { commonTasks } from "src/classes/CommonTasks";
import { stuffStore } from "src/classes/StuffStore";

import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";
import IconButton from "src/components/general/other/IconButton";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
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
    dispatch(controllers.createNewUser());
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
    <Box.Container mw="xl">
      <Box.Div
        style={{
          mt: 1,
        }}
      >
        <IconButton onClick={onBackToSignInClick}>
          <Icons.ArrowBack.Icon />
        </IconButton>
      </Box.Div>
      <Box.Flex sx={{ marginTop: 8 }} col ai="center">
        <Box.Div>
          <Icons.AccountCircleOutlined.Icon fontSize="large" color="primary" />
        </Box.Div>
        <Box.Container mw="xs">
          <GreyTextParagraph>
            Please enter this information to complete your account creation.
          </GreyTextParagraph>
          <Input.FirstName.WithValidator
            inputValue={state.auth.firstName}
            onInputChange={handleFirstNameInputChange}
          />
          <Input.LastName.WithValidator
            inputValue={state.auth.lastName}
            onInputChange={handleLastNameInputChange}
          />

          <Input.Button
            loading={state.global.appProgressions.authenticationProgress}
            loadingPosition="end"
            onClick={handleCreateNewUserConfirmClick}
            endIcon={<Icons.Check.Icon />}
            sx={{ mt: 1 }}
            disabled={isCreateNewUserConfirmButtonDisabled()}
          >
            Confirm
          </Input.Button>
        </Box.Container>
      </Box.Flex>
    </Box.Container>
  );
};

export default CreateNewUser;
