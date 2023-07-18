import { Input } from "~/components";
import LoadingButton from "~/components/auth/LoadingButton";
import Box from "~/components/general/box";
import IconButton from "~/components/general/other/IconButton";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { useCreate } from "~/hooks/useCreate";
import { useCustomRouter } from "~/hooks/useCustomRouter";
import { useAuthStore } from "~/store";
import { utils } from "~/utils";

const Create = () => {
  const authStore = useAuthStore();
  const router = useCustomRouter();
  const { updater } = useCreate();

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
    utils.isFullNameValid(authStore.firstName, authStore.lastName);

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
            firstName={authStore.firstName}
            lastName={authStore.lastName}
            onFirstNameInputChange={handleFirstNameInputChange}
            onLastNameInputChange={handleLastNameInputChange}
          />

          <LoadingButton
            loading={authStore.authenticationProgress}
            onClick={updater}
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

export default Create;
