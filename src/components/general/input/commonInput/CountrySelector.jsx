import Autocomplete from "@mui/material/Autocomplete";

import { validatorManager } from "classes/ValidatorManager";

import CustomTextInput from "components/general/input/CustomTextInput";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import CustomBox from "components/general/box/CustomBox";
import Img from "components/general/other/Img";
import Div from "components/general/box/Div";
import Span from "components/general/box/Span";

import { variables } from "variables";

//CLEANME: CountrySelector Autocomplete
const CountrySelector = ({
  countries,
  countryName,
  onCountryNameInputChange,
  onSelectedCountryChange,
  selectedCountry,
}) => {
  return (
    <Autocomplete
      value={selectedCountry}
      onChange={(_, newValue) => {
        onSelectedCountryChange(newValue);
      }}
      inputValue={countryName}
      onInputChange={(_, newInputValue) => {
        validatorManager.validators.countryName
          //TODO: Move validatorKeys to statics
          .inputValidator("countryName", newInputValue)
          .printInputValidatorError()
          .executeIfNoError(() => onCountryNameInputChange(newInputValue));
      }}
      options={countries}
      autoHighlight
      fullWidth
      getOptionLabel={(option) => option.countryName}
      renderOption={(props, option) => (
        <CustomFlexBox {...props}>
          <Div style={{ width: "90%" }}>
            <Span style={{ marginRight: "5px" }}>
              <Img
                loading="lazy"
                src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.countryShortName.toLowerCase()}.png 2x`}
                width="20"
              />
            </Span>
            {option.countryName}
          </Div>

          <CustomBox style={{ width: "10%" }}>+{option.countryCode}</CustomBox>
        </CustomFlexBox>
      )}
      renderInput={(params) => (
        <CustomTextInput
          {...params}
          required
          name={variables.other.helper.ELEMENT_NAMES.COUNTRY_NAME}
          label="Choose a country"
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
};

export default CountrySelector;

// import { matchSorter } from 'match-sorter';

// const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

// <Autocomplete filterOptions={filterOptions} />;
