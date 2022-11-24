import CustomBox from "components/generals/boxes/CustomBox";
import CustomIconButton from "components/generals/others/CustomIconButton";
import CustomInputAdornment from "components/generals/others/CustomInputAdornment";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

import { Icons } from "components/others/Icons";

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
