import { IconButton, InputAdornment } from "@mui/material";

import CustomBox from "components/generals/boxes/CustomBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

import { appIcons } from "variables/initials/initialValues/initialValues";

const { menu, search } = appIcons;

const SearchBar = ({ onDrawerIconClick }) => {
  return (
    <>
      <CustomBox>
        <IconButton onClick={onDrawerIconClick}>
          <menu.Icon />
        </IconButton>
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
              <InputAdornment position="start">
                <search.Icon />
              </InputAdornment>
            ),
          }}
        />
      </CustomBox>
    </>
  );
};

export default SearchBar;
