import {
  LoadingButtonProps,
  LoadingButton as MuiLoadingButton,
} from "@mui/lab";

import Box from "~/components/general/box";
import CircularProgress from "~/components/general/progress/CircularProgress";

interface Props extends LoadingButtonProps {
  loadingIndicatorText?: string;
}

const LoadingButton: React.FC<Props> = ({
  size = "large",
  variant = "contained",
  loadingIndicatorText = "",
  ...props
}) => {
  return (
    <MuiLoadingButton
      {...props}
      style={{
        borderRadius: "10px",
        ...props.style,
      }}
      loadingIndicator={
        <>
          <Box.Span
            style={{
              color: "white",
            }}
          >
            {loadingIndicatorText}
          </Box.Span>
          <CircularProgress
            style={{
              marginLeft: 10,
            }}
            size={20}
            color="info"
          />
        </>
      }
      fullWidth
      size={size}
      variant={variant}
    />
  );
};

export default LoadingButton;
