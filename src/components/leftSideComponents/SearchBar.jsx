import { Box, IconButton, InputAdornment } from "@mui/material";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

import { appIcons } from "variables/initials/initialValues/initialValues";

const { menu, search } = appIcons;

const SearchBar = ({ onDrawerIconClick }) => {
  return (
    <>
      <Box>
        <IconButton onClick={onDrawerIconClick}>
          <menu.Icon />
        </IconButton>
      </Box>
      <Box p={1} sx={{ width: "100%" }}>
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
      </Box>
    </>
  );
};

export default SearchBar;
