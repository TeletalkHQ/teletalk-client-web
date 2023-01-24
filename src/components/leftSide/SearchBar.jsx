import { Box } from "src/components/general/box";
import IconButton from "src/components/general/other/IconButton";
import InputAdornment from "src/components/general/other/InputAdornment";
import { Input } from "src/components/general/input";

import { Icons } from "src/components/other/Icons";

const SearchBar = ({ onDrawerIconClick }) => {
  return (
    <>
      <Box.Div>
        <IconButton onClick={onDrawerIconClick}>
          <Icons.Menu.Icon />
        </IconButton>
      </Box.Div>
      <Box.Div p={1} sx={{ width: "100%" }}>
        <Input.Text
          fullWidth
          size="small"
          placeholder="Search"
          InputProps={{
            sx: {
              borderRadius: "10px",
            },
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
