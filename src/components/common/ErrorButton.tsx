import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const ErrorButton: React.FC<Props> = (props) => (
  <Input.Button {...props} color="error" />
);

export default ErrorButton;
