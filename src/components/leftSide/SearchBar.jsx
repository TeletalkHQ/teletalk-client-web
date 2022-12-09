import CustomBox from "src/components/general/box/CustomBox";
import CustomIconButton from "src/components/general/other/CustomIconButton";
import CustomInputAdornment from "src/components/general/other/CustomInputAdornment";
import CustomTextInput from "src/components/general/input/CustomTextInput";

import { Icons } from "src/components/other/Icons";

const SearchBar = ({ onDrawerIconClick }) => {
  return (
    <>
      <CustomBox>
        <CustomIconButton onClick={onDrawerIconClick}>
          <Icons.Menu.Icon />
        </CustomIconButton>
      </CustomBox>
      <CustomBox p={1} sx={{ width: "100%" }}>
        <CustomTextInput
          fullWidth
          size="small"
          placeholder="Search"
          InputProps={{
            sx: {
              borderRadius: "10px",
            },
            startAdornment: (
              <CustomInputAdornment position="start">
                <Icons.Search.Icon />
              </CustomInputAdornment>
            ),
          }}
        />
      </CustomBox>
    </>
  );
};

export default SearchBar;
