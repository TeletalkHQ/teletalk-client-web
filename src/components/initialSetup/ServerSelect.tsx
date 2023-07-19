import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { appConfigs } from "~/classes/AppConfigs";
import { Input } from "~/components";
import Box from "~/components/general/box";
import { Url } from "~/types";

interface Props {
  onServerSelectChange: (url: Url) => void;
  selectedServer: string;
}

const ServerSelect: React.FC<Props> = ({
  onServerSelectChange,
  selectedServer,
}) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="labelId">Selected server</InputLabel>
        <Input.Select
          defaultValue={selectedServer}
          labelId="labelId"
          value={selectedServer}
          label="Selected server"
          onChange={(props) => onServerSelectChange(props.target.value as Url)}
        >
          {appConfigs.getConfigs().api.servers.map((item, index) => (
            <Box.MenuItem key={index} value={item.url}>
              {item.url}
            </Box.MenuItem>
          ))}
        </Input.Select>
      </FormControl>
    </>
  );
};

export default ServerSelect;
