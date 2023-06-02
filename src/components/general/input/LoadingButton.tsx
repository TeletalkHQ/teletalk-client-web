import {
  LoadingButtonProps,
  LoadingButton as MuiLoadingButton,
} from "@mui/lab";

const LoadingButton: React.FC<LoadingButtonProps> = ({
  size = "large",
  variant = "contained",
  ...props
}) => {
  return (
    <MuiLoadingButton
      {...props}
      style={{
        borderRadius: "10px",
        ...props.style,
      }}
      fullWidth
      size={size}
      variant={variant}
    />
  );
};

export default LoadingButton;
