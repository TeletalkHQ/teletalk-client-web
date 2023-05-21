import { useDispatch, useSelector } from "react-redux";

import { commonTasks } from "~/classes/CommonTasks";
import { stuffStore } from "~/classes/StuffStore";
import LoadingButton from "~/components/auth/LoadingButton";

import { Box } from "~/components/general/box";
import { Icons } from "~/components/other/Icons";
import { Input } from "~/components/general/input";
import AuthFooter from "~/components/other/AuthFooter";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import IconButton from "~/components/general/other/IconButton";

import { controllers } from "~/controllers";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";

const CreateNewUser = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleFirstNameInputChange = (e) => {
    dispatch(actions.firstNameOnChange({ firstName: e.target.value }));
  };

  const handleBackToSignInClick = () => {
    dispatch(actions.verificationCodeOnChange({ verificationCode: "" }));
    dispatch(commonActions.changeViewMode.signIn());
  };

  const handleLastNameInputChange = (e) => {
    dispatch(actions.lastNameOnChange({ lastName: e.target.value }));
  };

  const handleCreateNewUserConfirmClick = () => {
    dispatch(controllers.createNewUser());
  };

  const isCreateNewUserConfirmButtonDisabled = () => {
    const firstNameValidateResult = commonTasks.validateInputValueLengthByModel(
      stuffStore.models.firstName,
      state.auth.firstName
    );

    const lastNameValidateResult = commonTasks.validateInputValueLengthByModel(
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
        <IconButton onClick={handleBackToSignInClick}>
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

          <Input.FullName
            firstName={state.auth.firstName}
            lastName={state.auth.lastName}
            onFirstNameInputChange={handleFirstNameInputChange}
            onLastNameInputChange={handleLastNameInputChange}
          />

          <LoadingButton
            loading={state.global.appProgressions.authenticationProgress}
            onClick={handleCreateNewUserConfirmClick}
            buttonValue={"Create"}
            indicatorValue={"Creating..."}
            disabled={isCreateNewUserConfirmButtonDisabled()}
            sx={{ mt: 1 }}
          />
        </Box.Container>
      </Box.Flex>

      <AuthFooter />
    </Box.Container>
  );
};

export default CreateNewUser;
