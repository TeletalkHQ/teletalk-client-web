import { Button as MuiButton } from "@mui/material";

const Button = ({
  color,
  style,
  size = "large",
  variant = "contained",
  ...props
}) => {
  return (
    <MuiButton
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