import { Input } from "~/components";
import Box from "~/components/general/box";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  onChange: OnChangeValidatorFn;
  username: string;
  usernameLength: string | number;
}

const EditUsernameContent: React.FC<Props> = ({
  onChange,
  username,
  usernameLength,
}) => {
  return (
    <Box.Flex style={{ maxWidth: 400 }} col>
      <Input.Username value={username} onChange={onChange} />

      <GreyTextParagraph>
        You can choose a username on Teletalk. If you do, other people will be
        able to find you by this username and contact you without knowing your
        phone number. You can use a-z, 0-9 and underscores. Minimum length is{" "}
        {usernameLength} characters.
      </GreyTextParagraph>
    </Box.Flex>
  );
};

export default EditUsernameContent;
