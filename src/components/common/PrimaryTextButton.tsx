import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const PrimaryTextButton: React.FC<Props> = (props) => (
  <Input.PrimaryButton {...props} variant="text" />
);

export default PrimaryTextButton;
