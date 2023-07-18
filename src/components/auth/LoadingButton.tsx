import { SxProps } from "@mui/material";

import { Input } from "~/components";
import Box from "~/components/general/box";
import CircularProgress from "~/components/general/progress/CircularProgress";
import { ElementLabel, Style, VoidNoArgsFn } from "~/types";

interface Props {
  disabled: boolean;
  loading: boolean;
  onClick: VoidNoArgsFn;
  style?: Style;
  indicatorValue: ElementLabel;
  buttonValue: ElementLabel;
  sx: SxProps;
}

const LoadingButton: React.FC<Props> = ({
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
