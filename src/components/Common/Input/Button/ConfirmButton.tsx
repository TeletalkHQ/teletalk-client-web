import { LoadingButtonProps } from "@mui/lab";

import { BaseComponent } from "~/components/Base";

interface Props extends LoadingButtonProps {
  loadingIndicatorText?: string;
}

const ConfirmButton: React.FC<Props> = ({
  loadingIndicatorText = "Updating...",
  ...rest
}) => (
  <BaseComponent.Input.LoadingButton
    {...rest}
    loadingIndicatorText={loadingIndicatorText}
  >
    Confirm
  </BaseComponent.Input.LoadingButton>
);

export default ConfirmButton;
