import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";

import CustomTextInput from "components/generals/inputs/CustomTextInput";
import CustomBox from "components/generals/boxes/CustomBox";

import { elementNames } from "variables/initials/initialValues/elementNames";

//CLEANME CountrySelector Autocomplete
const CountrySelector = ({
  countries,
  countryName,
  onCountryNameAutocompleteOnchange,
  onCountryNameOnInputChange,
  selectedCountry,
}) => {
  return (
    <Autocomplete
      value={selectedCountry}
      onChange={(_, newValue) => {
        onCountryNameAutocompleteOnchange(newValue);
      }}
      inputValue={countryName}
      onInputChange={(_, newInputValue) => {
        onCountryNameOnInputChange(newInputValue);
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
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.countryShortName.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.countryName} ({option.countryShortName}) +{option.countryCode}
        </CustomBox>
      )}
      renderInput={(params) => (
        <CustomTextInput
          {...params}
          required
          name={elementNames.countryName}
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
