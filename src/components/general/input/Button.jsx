import { Button as MuiButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Button = ({
  btn,
  button,
  color,
  lbtn,
  loadingButton,
  style,
  size = "large",
  variant = "contained",
  ...props
}) => {
  //TODO: Separate into two components
  const SelectedComponent = btn || button ? MuiButton : LoadingButton;

  return (
    <SelectedComponent
      style={{
        borderRadius: "10px",
        ...style,
      }}
      fullWidth
      size={size}
      variant={variant}
      {...{
        color,
        ...props,
      }}
    />
  );
};

export default Button;
