import LoadingButton from "~/components/auth/LoadingButton";
import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import IconButton from "~/components/general/other/IconButton";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import AuthFooter from "~/components/other/AuthFooter";
import { Icons } from "~/components/other/Icons";
import { useCreate } from "~/hooks/useCreate";
import { useCustomRouter } from "~/hooks/useCustomRouter";
import { useAuthStore } from "~/store";
import { utils } from "~/utils";

const Create = () => {
  const authState = useAuthStore();
  const router = useCustomRouter();
  const { updater } = useCreate();

  const handleFirstNameInputChange = utils.createOnChangeValidator(
    "firstName",
    (value: string) => {
      authState.updateFirstName(value);
    }
  );
  const handleLastNameInputChange = utils.createOnChangeValidator(
    "lastName",
    (value: string) => {
      authState.updateLastName(value);
    }
  );

  const handleBackToSignInClick = () => {
    router.back();
  };

  const isCreateNewUserConfirmButtonDisabled = () => {
    const firstNameValidateResult = utils.isValueLengthInBetweenMinMax(
      "firstName",
      authState.firstName
    );

    const lastNameValidateResult = utils.isValueLengthInBetweenMinMax(
      "lastName",
      authState.lastName
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
            firstName={authState.firstName}
            lastName={authState.lastName}
            onFirstNameInputChange={({ target: { value } }) => {
              handleFirstNameInputChange(value);
            }}
            onLastNameInputChange={({ target: { value } }) => {
              handleLastNameInputChange(value);
            }}
          />

          <LoadingButton
            loading={authState.authenticationProgress}
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
