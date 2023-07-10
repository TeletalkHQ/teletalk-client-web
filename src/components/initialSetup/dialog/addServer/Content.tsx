import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import { CommonOnChange, Status, VoidNoArgsFn } from "~/types";

import ServerStatus from "../../ServerStatus";

interface Props {
  disabled: boolean;
  inputValue: string;
  loading: boolean;
  onInputChange: CommonOnChange;
  onTestClick: VoidNoArgsFn;
  status: Status;
}

const Content: React.FC<Props> = ({
  inputValue,
  loading,
  onInputChange,
  onTestClick,
  status,
  disabled,
}) => {
  return (
    <Box.Div style={{ maxWidth: "400px" }}>
      <Input.Text
        InputProps={{ startAdornment: "https://" }}
        disabled={disabled}
        label="Url"
        value={inputValue}
        onChange={onInputChange}
      />
      <ServerStatus
        indicatorValue="Pinging..."
        disabled={!inputValue}
        loading={loading}
        onClick={onTestClick}
        status={status}
      />
    </Box.Div>
  );
};

export default Content;
