import { useRouter } from "next/router";

import { commonTasks } from "~/classes/CommonTasks";
import LoadingButton from "~/components/auth/LoadingButton";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import IconButton from "~/components/general/other/IconButton";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { createInputValidator } from "~/helpers/createInputValidator";
import { useAuthStore } from "~/store";

const CreateNewUser = () => {
  const state = useAuthStore();
  const router = useRouter();

  const handleFirstNameInputChange = createInputValidator(
    "firstName",
    (value: string) => {
      state.updateFirstName(value);
    }
  );
  const handleLastNameInputChange = (value: string) => {
    state.updateLastName(value);
  };

  const handleBackToSignInClick = () => {
    state.updateVerificationCode("");
    router.back();
  };

  const handleCreateNewUserConfirmClick = () => {
    console.log("create clicked!");
  };

  const isCreateNewUserConfirmButtonDisabled = () => {
    const firstNameValidateResult = commonTasks.isValueLengthInBetweenMinMax(
      "firstName",
      state.firstName
    );

    const lastNameValidateResult = commonTasks.isValueLengthInBetweenMinMax(
      "lastName",
      state.lastName
    );

    return !firstNameValidateResult || !lastNameValidateResult;
  };

  return (
    <Box.Container mw="xl">
      <Box.Div
        style={{
          marginTop: 1,
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
            firstName={state.firstName}
            lastName={state.lastName}
            onFirstNameInputChange={({ target: { value } }) => {
              handleFirstNameInputChange(value);
            }}
            onLastNameInputChange={({ target: { value } }) => {
              handleLastNameInputChange(value);
            }}
          />

          <LoadingButton
            loading={state.authenticationProgress}
            onClick={handleCreateNewUserConfirmClick}
            buttonValue="Create"
            indicatorValue="Creating..."
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
