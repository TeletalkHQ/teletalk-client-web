import { AutocompleteRenderInputParams } from "@mui/material";
import { Input } from "~/components/general/input";

import { variables } from "~/variables";

const SelectorInput = (params: AutocompleteRenderInputParams) => (
  <Input.Text
    {...params}
    required
    name={variables.other.helper.ELEMENT_NAMES.countryName}
    label={variables.other.helper.ELEMENT_LABELS.CHOOSE_A_COUNTRY}
    InputProps={{
      ...params.InputProps,
    }}
  />
);

export default SelectorInput;
