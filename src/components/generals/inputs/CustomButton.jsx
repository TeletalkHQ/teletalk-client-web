const { LoadingButton } = require("@mui/lab");
const { Button } = require("@mui/material");

const CustomButton = ({
  btn,
  lbtn,
  button,
  loadingButton,
  style,
  ...props
}) => {
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
      {...props}
    />
  );
};

export default CustomButton;
