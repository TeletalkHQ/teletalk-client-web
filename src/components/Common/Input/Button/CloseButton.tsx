import { ButtonProps } from "@mui/material";

import PrimaryTextButton from "./PrimaryTextButton";

interface Props extends ButtonProps {}

const CloseButton: React.FC<Props> = (props) => (
  <PrimaryTextButton {...props}>Close</PrimaryTextButton>
);

export default CloseButton;
