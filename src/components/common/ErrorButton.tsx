import { Input } from "~/components";
import { CustomLoadingButtonProps } from "~/types";

interface Props extends CustomLoadingButtonProps {}

const ErrorButton: React.FC<Props> = (props) => (
  <Input.LoadingButton {...props} color="error" />
);

export default ErrorButton;
