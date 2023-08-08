import { Input } from "~/components";
import { CustomLoadingButtonProps } from "~/types";

interface Props extends CustomLoadingButtonProps {}

const ErrorTextButton: React.FC<Props> = (props) => (
  <Input.ErrorButton {...props} variant="text" />
);

export default ErrorTextButton;
