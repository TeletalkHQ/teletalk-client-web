import { LoadingButton } from "@mui/lab";

const Button = ({
  color,
  style,
  size = "large",
  variant = "contained",
  ...props
}) => {
  return (
    <LoadingButton
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
