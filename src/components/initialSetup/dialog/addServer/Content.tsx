import { FormControl, InputLabel } from "@mui/material";

import { Input } from "~/components";
import Box from "~/components/general/box";
import ServerStatus from "~/components/initialSetup/ServerStatus";
import {
  CommonOnChange,
  CommonSelectOnChange,
  Status,
  VoidNoArgsFn,
} from "~/types";

interface Props {
  disabled: boolean;
  inputValue: string;
  loading: boolean;
  onInputChange: CommonOnChange;
  onSelectChange: CommonSelectOnChange;
  onTestClick: VoidNoArgsFn;
  protocol: string;
  status: Status;
}

const Content: React.FC<Props> = ({
  disabled,
  inputValue,
  loading,
  onInputChange,
  onSelectChange,
  onTestClick,
  protocol,
  status,
}) => {
  return (
    <Box.Flex col gap="5px" style={{ maxWidth: "400px" }}>
      <Box.Flex width="100%" jc="space-between" ai="center">
        <FormControl style={{ width: "25%" }} fullWidth>
          <InputLabel>Protocol</InputLabel>
          <Input.Select
            defaultValue={protocol}
            label="Protocol"
            disabled={disabled}
            value={protocol}
            onChange={onSelectChange}
          >
            {["http", "https"].map((item, index) => (
              <Box.MenuItem key={index} value={item}>
                {item}
              </Box.MenuItem>
            ))}
          </Input.Select>
        </FormControl>

        <Input.Text
          style={{ width: "73%" }}
          disabled={disabled}
          label="Url"
          value={inputValue}
          onChange={onInputChange}
        />
      </Box.Flex>
      <ServerStatus
        indicatorValue="Pinging..."
        disabled={!inputValue}
        loading={loading}
        onClick={onTestClick}
        status={status}
      />
    </Box.Flex>
  );
};

export default Content;
