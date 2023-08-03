import { Input } from "~/components";
import Box from "~/components/general/box";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import { OnChangeValidatorFn } from "~/types";

interface Props {
  bio: string;
  onChange: OnChangeValidatorFn;
}

const EditBioContent: React.FC<Props> = ({ bio, onChange }) => {
  return (
    <Box.Flex
      style={{
        maxWidth: 400,
      }}
      col
    >
      <Input.Bio value={bio} onChange={onChange} />
      <GreyTextParagraph>
        any details such as age, occupation or city. Example: 23 y.o. designer
        from San Francisco
      </GreyTextParagraph>
    </Box.Flex>
  );
};

export default EditBioContent;
