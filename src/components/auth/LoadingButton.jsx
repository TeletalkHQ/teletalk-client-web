import { Box } from "src/components/general/box";
import CircularProgress from "src/components/general/progress/CircularProgress";
import { Input } from "src/components/general/input";

const LoadingButton = ({
  disabled,
  loading,
  onClick,
  style,
  indicatorValue,
  buttonValue,
  ...rest
}) => {
  return (
    <Input.LoadingButton
      disabled={disabled}
      loading={loading}
      loadingIndicator={
        <>
          <Box.Span>{indicatorValue}</Box.Span>
          <CircularProgress style={{ marginLeft: 10 }} size={20} color="info" />
        </>
      }
      onClick={onClick}
      style={style}
      {...rest}
    >
      {buttonValue}
    </Input.LoadingButton>
  );
};

export default LoadingButton;
