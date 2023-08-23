import { CustomLoadingButtonProps } from "~/types";

import ErrorButton from "./ErrorButton";

interface Props extends CustomLoadingButtonProps {}

const ErrorTextButton: React.FC<Props> = (props) => (
  <ErrorButton {...props} variant="text" />
);

export default ErrorTextButton;
