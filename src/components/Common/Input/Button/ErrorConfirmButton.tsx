import { CustomLoadingButtonProps } from "~/types";

import ConfirmButton from "./ConfirmButton";

interface Props extends CustomLoadingButtonProps {}

const ErrorConfirmButton: React.FC<Props> = (props) => {
  return (
    <ConfirmButton {...props} color="error">
      Confirm
    </ConfirmButton>
  );
};

export default ErrorConfirmButton;
