import { Button as MuiButton } from "@mui/material";

const Button = ({
  color,
  style,
  size = "large",
  fullWidth = true,
  variant = "contained",
  ...props
}) => {
  return (
    <MuiButton
      style={{
        borderRadius: "10px",
        ...style,
      }}
      fullWidth={fullWidth}
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
