import { stuffStore } from "~/classes/StuffStore";
import { BaseComponent } from "~/components/Base";
import { OnChangeValidatorFn } from "~/types";
import { utils } from "~/utils";

interface Props {
  onChange: OnChangeValidatorFn;
  value: string;
}

const Bio: React.FC<Props> = ({ onChange, value }) => {
  const handleChange = utils.createOnChangeValidator("bio", onChange);

  return (
    <BaseComponent.Input.Text
      name="bio"
      multiline
      maxRows={3}
      label="Bio"
      onChange={handleChange}
      value={value}
      InputProps={{
        endAdornment: (
          <BaseComponent.Input.Adornment position="end">
            {stuffStore.models.bio.maxLength - value.length}
          </BaseComponent.Input.Adornment>
        ),
      }}
    />
  );
};

export default Bio;
