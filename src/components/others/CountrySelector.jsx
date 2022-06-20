import * as React from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

const CountrySelector = ({
  countries,
  countryName,
  onCountryNameOnchange,
  onCountryNameOnInputChange,
  selectedCountry,
}) => {
  return (
    <Autocomplete
      value={selectedCountry}
      onChange={(_, newValue) => {
        onCountryNameOnchange(newValue);
      }}
      inputValue={countryName}
      onInputChange={(_, newInputValue) => {
        onCountryNameOnInputChange(newInputValue);
      }}
      id="country-select-demo"
      options={countries}
      autoHighlight
      fullWidth
      getOptionLabel={(option) => option.countryName}
      renderOption={(props, option) => (
        <Box
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
        </Box>
      )}
      renderInput={(params) => (
        <CustomTextInput
          {...params}
          required
          label="Choose a country"
          InputProps={{
            ...params.InputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
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
