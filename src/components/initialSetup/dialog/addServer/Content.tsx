import { Input } from "~/components";
import Box from "~/components/general/box";
import ServerStatus from "~/components/initialSetup/ServerStatus";
import { CommonOnChange, Status, VoidNoArgsFn } from "~/types";

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
