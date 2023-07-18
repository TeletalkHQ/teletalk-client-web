import { AutocompleteRenderInputParams } from "@mui/material";

import { Input } from "~/components";

const SelectorInput = (props: AutocompleteRenderInputParams) => {
  const { id, ...rest } = props;

  return (
    <Input.Text
      {...rest}
      required
      name="countryName"
      label="Choose a country"
      InputProps={{
        ...props.InputProps,
      }}
    />
  );
};

export default SelectorInput;
