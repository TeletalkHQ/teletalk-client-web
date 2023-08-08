import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const CloseButton: React.FC<Props> = (props) => (
  <Input.PrimaryTextButton {...props}>Close</Input.PrimaryTextButton>
);

export default CloseButton;
