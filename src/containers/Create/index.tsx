import { Box, Button, Components, Icon, Input, Typography } from "~/components";
import { useCreate, useCustomRouter } from "~/hooks";
import { useAuthStore } from "~/store";
import { utils } from "~/utils";

const Create = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { handler, loading } = useCreate();

  const handleFirstNameInputChange = (value: string) => {
    authStore.updateFirstName(value);
  };

  const handleLastNameInputChange = (value: string) => {
    authStore.updateLastName(value);
  };

  const handleBackToSignInClick = () => {
    router.back();
  };

  const isCreateNewUserConfirmButtonDisabled = () =>
    utils.isFullNameValid(authStore);

  return (
    <Box.Container mw="xl">
      <Box.Div
        style={{
          marginTop: 1,
        }}
      >
        <Button.Icon onClick={handleBackToSignInClick}>
          <Icon.ArrowBack.Element />
        </Button.Icon>
      </Box.Div>
      <Box.Flex sx={{ marginTop: 8 }} col ai="center">
        <Box.Div>
          <Icon.AccountCircleOutlined.Element
            fontSize="large"
            color="primary"
          />
        </Box.Div>
        <Box.Container mw="xs">
          <Typography.GreyTextParagraph>
            Please enter this information to complete your account creation.
          </Typography.GreyTextParagraph>

          <Input.Text.FullName
            firstName={authStore.firstName}
            lastName={authStore.lastName}
            onFirstNameInputChange={handleFirstNameInputChange}
            onLastNameInputChange={handleLastNameInputChange}
          />

          <Button.Loading
            disabled={isCreateNewUserConfirmButtonDisabled()}
            loading={loading}
            loadingIndicatorText="Creating..."
            onClick={handler}
            sx={{
              mt: 1,
            }}
          >
            Create
          </Button.Loading>
        </Box.Container>
      </Box.Flex>

      <Components.AuthFooter />
    </Box.Container>
  );
};

export default Create;
