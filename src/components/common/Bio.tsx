import { stuffStore } from "~/classes/StuffStore";
import { GeneralInput } from "~/components/general/input";
import InputAdornment from "~/components/general/other/InputAdornment";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  onChange: OnChangeValidatorFn;
  value: string;
}

const Bio: React.FC<Props> = ({ onChange, value }) => {
  const handleChange = utils.createOnChangeValidator("bio", onChange);

  return (
    <GeneralInput.Text
      name="bio"
      multiline
      maxRows={3}
      label="Bio"
      onChange={handleChange}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {stuffStore.models.bio.maxLength - value.length}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Bio;
