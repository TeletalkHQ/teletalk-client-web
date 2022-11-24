import Autocomplete from "@mui/material/Autocomplete";

import { validatorManager } from "classes/ValidatorManager";

import CustomTextInput from "components/generals/inputs/CustomTextInput";
import CustomBox from "components/generals/boxes/CustomBox";
import Img from "components/generals/others/Img";

import { ELEMENT_NAMES } from "variables/otherVariables/helpers";

//CLEANME CountrySelector Autocomplete
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
          .inputValidator("countryName", newInputValue)
          .printInputValidatorError()
          .executeIfNoError(() => onCountryNameInputChange(newInputValue));
      }}
      options={countries}
      autoHighlight
      fullWidth
      getOptionLabel={(option) => option.countryName}
      renderOption={(props, option) => (
        <CustomBox
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <Img
            alt=""
            loading="lazy"
            src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.countryShortName.toLowerCase()}.png 2x`}
            width="20"
          />
          {option.countryName} ({option.countryShortName}) +{option.countryCode}
        </CustomBox>
      )}
      renderInput={(params) => (
        <CustomTextInput
          {...params}
          required
          name={ELEMENT_NAMES.COUNTRY_NAME}
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
