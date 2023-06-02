import { Box } from "~/components/general/box";
import CircularProgress from "~/components/general/progress/CircularProgress";
import { Input } from "~/components/general/input";

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
