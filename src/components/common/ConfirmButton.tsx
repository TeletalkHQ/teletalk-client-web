import { LoadingButtonProps } from "@mui/lab";

import { Input } from "~/components";

interface Props extends LoadingButtonProps {
  loadingIndicatorText?: string;
}

const ConfirmButton: React.FC<Props> = ({
  loadingIndicatorText = "Updating...",
  ...rest
}) => (
  <Input.LoadingButton
    {...rest}
    loadingIndicatorText={loadingIndicatorText}
    color="primary"
  >
    Confirm
  </Input.LoadingButton>
);

export default ConfirmButton;
