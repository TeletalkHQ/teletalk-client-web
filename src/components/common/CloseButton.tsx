import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const CloseButton: React.FC<Props> = (props) => (
  <Input.Button {...props} variant="text" color="primary">
    Close
  </Input.Button>
);

export default CloseButton;
