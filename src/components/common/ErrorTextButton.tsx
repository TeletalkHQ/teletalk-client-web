import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const ErrorTextButton: React.FC<Props> = (props) => (
  <Input.ErrorButton {...props} variant="text" />
);

export default ErrorTextButton;
