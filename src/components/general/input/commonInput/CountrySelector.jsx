import Autocomplete from "@mui/material/Autocomplete";

import { validatorManager } from "src/classes/validator/ValidatorManager";

import CustomTextInput from "src/components/general/input/CustomTextInput";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import CustomBox from "src/components/general/box/CustomBox";
import Img from "src/components/general/other/Img";
import Div from "src/components/general/box/Div";
import Span from "src/components/general/box/Span";

import { variables } from "src/variables";

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
          .inputValidator(
            variables.other.helper.VALIDATION_KEYS.countryName,
            newInputValue
          )
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
          label={variables.other.helper.ELEMENT_LABELS.CHOOSE_A_COUNTRY}
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
