import { AutocompleteRenderInputParams } from "@mui/material";

import { BaseComponent } from "~/components/Base";

const SelectorInput = (props: AutocompleteRenderInputParams) => {
  const { id, ...rest } = props;

  return (
    <BaseComponent.Input.Text
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
