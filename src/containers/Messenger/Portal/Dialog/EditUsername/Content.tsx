import { Box, Input, Typography } from "~/components";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  onChange: OnChangeValidatorFn;
  username: string;
  usernameLength: string | number;
}

const Content: React.FC<Props> = ({ onChange, username, usernameLength }) => {
  return (
    <Box.Flex style={{ maxWidth: 400 }} col>
      <Input.Text.Username value={username} onChange={onChange} />

      <Typography.GreyTextParagraph>
        You can choose a username on Teletalk. If you do, other people will be
        able to find you by this username and contact you without knowing your
        phone number. You can use a-z, 0-9 and underscores. Minimum length is{" "}
        {usernameLength} characters.
      </Typography.GreyTextParagraph>
    </Box.Flex>
  );
};

export default Content;
