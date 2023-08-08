import { ButtonProps } from "@mui/material";

import { Input } from "~/components";

interface Props extends ButtonProps {}

const CancelButton: React.FC<Props> = (props) => (
  <Input.ErrorTextButton {...props}>Cancel</Input.ErrorTextButton>
);

export default CancelButton;
