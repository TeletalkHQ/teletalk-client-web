import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const PrimaryButton: React.FC<Props> = (props) => (
  <Input.Button {...props} color="primary" />
);

export default PrimaryButton;
