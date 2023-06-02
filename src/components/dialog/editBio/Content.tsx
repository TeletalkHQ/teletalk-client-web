import { Box } from "~/components/general/box";
import { Input } from "~/components/general/input";
import InputAdornment from "~/components/general/other/InputAdornment";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";

const EditBioContent = ({ bio, bioModelLength, onInputChange }) => {
  return (
    <Box.Flex style={{ maxWidth: 400 }} col>
      <Input.Text
        name="bio"
        multiline
        maxRows={3}
        label="Bio"
        onChange={onInputChange}
        value={bio}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {bioModelLength - bio.length}
            </InputAdornment>
          ),
        }}
      />
      <GreyTextParagraph>
        any details such as age, occupation or city. Example: 23 y.o. designer
        from San Francisco
      </GreyTextParagraph>
    </Box.Flex>
  );
};

export default EditBioContent;
