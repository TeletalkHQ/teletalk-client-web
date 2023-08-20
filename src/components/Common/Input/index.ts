import { Button } from "./Button";
import { Select } from "./Select";
import { TextWithValidator } from "./TextWithValidator";

export const CommonInput = {
  Button,
  Select,
  Text: {
    ...TextWithValidator,
  },
};
