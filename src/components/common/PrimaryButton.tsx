import { Input } from "~/components";
import { CustomLoadingButtonProps } from "~/types";

interface Props extends CustomLoadingButtonProps {}

const PrimaryButton: React.FC<Props> = (props) => (
  <Input.LoadingButton {...props} color="primary" />
);

export default PrimaryButton;
