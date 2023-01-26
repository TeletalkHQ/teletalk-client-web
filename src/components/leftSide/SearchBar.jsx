import { Box } from "src/components/general/box";
import IconButton from "src/components/general/other/IconButton";
import InputAdornment from "src/components/general/other/InputAdornment";
import { Input } from "src/components/general/input";

import { Icons } from "src/components/other/Icons";

const SearchBar = ({ onDrawerIconClick }) => {
  return (
    <>
      <Box.Flex style={{ width: "100%" }} jc="space-between" ai="center">
        <Box.Div style={{ paddingLeft: 5 }}>
          <IconButton onClick={onDrawerIconClick}>
            <Icons.Menu.Icon />
          </IconButton>
        </Box.Div>

        <Box.Div style={{ width: "90%", padding: 5 }}>
          <Input.Text
            fullWidth
            size="small"
            placeholder="Search"
            InputProps={{
              style: { borderRadius: 50 },
              startAdornment: (
                <InputAdornment position="start">
                  <Icons.Search.Icon />
                </InputAdornment>
              ),
            }}
          />
        </Box.Div>
      </Box.Flex>
    </>
  );
};

export default SearchBar;
