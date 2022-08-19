import CustomBox from "components/generals/boxes/CustomBox";
import CustomIconButton from "components/generals/otherGeneralComponents/CustomIconButton";
import CustomInputAdornment from "components/generals/otherGeneralComponents/CustomInputAdornment";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

import { appIcons } from "variables/initials/initialValues/appIcons";

const { menu, search } = appIcons;

const SearchBar = ({ onDrawerIconClick }) => {
  return (
    <>
      <CustomBox>
        <CustomIconButton onClick={onDrawerIconClick}>
          <menu.Icon />
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
                <search.Icon />
              </CustomInputAdornment>
            ),
          }}
        />
      </CustomBox>
    </>
  );
};

export default SearchBar;
