import { Input } from "~/components";
import Box from "~/components/general/box";
import IconButton from "~/components/general/other/IconButton";
import InputAdornment from "~/components/general/other/InputAdornment";
import { Icons } from "~/components/other/Icons";
import { VoidNoArgsFn } from "~/types";

interface Props {
  onDrawerIconClick: VoidNoArgsFn;
}

const SearchBar: React.FC<Props> = ({ onDrawerIconClick }) => {
  return (
    <Box.Paper
      style={{
        width: "100%",

        height: 50,
        borderRadius: "0px",
        padding: "0px",
      }}
    >
      <Box.Flex
        gap={1}
        style={{ width: "100%" }}
        jc="space-between"
        ai="center"
      >
        <Box.Div style={{ paddingLeft: 5 }}>
          <IconButton onClick={onDrawerIconClick}>
            <Icons.Menu.Icon />
          </IconButton>
        </Box.Div>

        <Box.Div style={{ width: "90%", marginRight: 5 }}>
          <Input.Text
            fullWidth
            size="small"
            placeholder="Search"
            InputProps={{
              style: { borderRadius: 10 },
              startAdornment: (
                <InputAdornment position="start">
                  <Icons.Search.Icon />
                </InputAdornment>
              ),
            }}
          />
        </Box.Div>
      </Box.Flex>
    </Box.Paper>
  );
};

export default SearchBar;
