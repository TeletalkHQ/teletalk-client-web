import { ButtonProps } from "@mui/material";

import ErrorTextButton from "./ErrorTextButton";

interface Props extends ButtonProps {}

const CancelButton: React.FC<Props> = (props) => (
  <ErrorTextButton {...props}>Cancel</ErrorTextButton>
);

export default CancelButton;
