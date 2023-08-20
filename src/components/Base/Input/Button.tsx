import { ButtonProps, Button as MuiButton } from "@mui/material";

const Button: React.FC<ButtonProps> = ({
  size = "large",
  fullWidth = true,
  variant = "contained",
  style,
  ...rest
}) => {
  return (
    <MuiButton
      {...rest}
      style={{
        borderRadius: "10px",
        ...style,
      }}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
    />
  );
};

export default Button;
