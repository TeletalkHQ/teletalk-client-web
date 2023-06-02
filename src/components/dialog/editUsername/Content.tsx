import { Box } from "~/components/general/box";
import { Input } from "~/components/general/input";
import InputAdornment from "~/components/general/other/InputAdornment";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";

const EditUsernameContent = ({
  username,
  usernameModelLength,
  onInputChange,
}) => {
  return (
    <Box.Flex style={{ maxWidth: 400 }} col>
      <Input.Text
        autoFocus
        name="username"
        label="Username"
        onChange={onInputChange}
        value={username}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />

      <GreyTextParagraph>
        You can choose a username on Teletalk. If you do, other people will be
        able to find you by this username and contact you without knowing your
        phone number. You can use a-z, 0-9 and underscores. Minimum length is{" "}
        {usernameModelLength} characters.
      </GreyTextParagraph>
    </Box.Flex>
  );
};

export default EditUsernameContent;
