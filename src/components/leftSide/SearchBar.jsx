import { Box } from "src/components/general/box";
import IconButton from "src/components/general/other/IconButton";
import InputAdornment from "src/components/general/other/InputAdornment";
import { Input } from "src/components/general/input";

import { Icons } from "src/components/other/Icons";

const SearchBar = ({ onDrawerIconClick }) => {
  return (
    <>
      <Box.Div style={{ padding: 10 }}>
        <IconButton onClick={onDrawerIconClick}>
          <Icons.Menu.Icon />
        </IconButton>
      </Box.Div>

      <Box.Div>
        <Input.Text
          size="small"
          placeholder="Search"
          InputProps={{
            style: { borderRadius: "50px" },
            startAdornment: (
              <InputAdornment position="start">
                <Icons.Search.Icon />
              </InputAdornment>
            ),
          }}
        />
      </Box.Div>
    </>
  );
};

export default SearchBar;
