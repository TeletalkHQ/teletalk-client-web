import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const CustomButton = ({
  btn,
  button,
  color,
  lbtn,
  loadingButton,
  style,
  ...props
}) => {
  //TODO WHAT!?! Separate into two components
  const SelectedComponent = btn || button ? Button : LoadingButton;

  return (
    <SelectedComponent
      style={{
        borderRadius: "10px",
        ...style,
      }}
      fullWidth
      size="large"
      variant="contained"
      {...{
        color,
        ...props,
      }}
    />
  );
};

export default CustomButton;
