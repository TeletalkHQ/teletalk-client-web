import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const CancelButton: React.FC<Props> = (props) => (
  <Input.Button {...props} variant="text" color="error">
    Cancel
  </Input.Button>
);

export default CancelButton;
