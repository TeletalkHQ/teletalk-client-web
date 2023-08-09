import { CustomLoadingButtonProps } from "~/types";

import ConfirmButton from "./ConfirmButton";

interface Props extends CustomLoadingButtonProps {}

const ErrorConfirmButton: React.FC<Props> = (props) => {
  return <ConfirmButton {...props}>Confirm</ConfirmButton>;
};

export default ErrorConfirmButton;
