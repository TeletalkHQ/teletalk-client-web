import CustomBox from "components/general/box/CustomBox";
import CustomIconButton from "components/general/other/CustomIconButton";
import CustomInputAdornment from "components/general/other/CustomInputAdornment";
import CustomTextInput from "components/general/input/CustomTextInput";

import { Icons } from "components/other/Icons";

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
