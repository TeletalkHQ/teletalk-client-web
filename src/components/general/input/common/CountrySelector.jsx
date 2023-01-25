import Autocomplete from "@mui/material/Autocomplete";

import { validatorManager } from "src/classes/validator/ValidatorManager";

import { Input } from "src/components/general/input";
import { Box } from "src/components/general/box";
import Img from "src/components/general/other/Img";

import { variables } from "src/variables";

const CountrySelector = ({
  countries,
  countryName,
  onCountryNameInputChange,
  onSelectedCountryChange,
  selectedCountry,
}) => {
  const getOptionLabel = (option) => option.countryName;

  const handleCountryNameInputChange = (_, newInputValue) => {
    validatorManager.validators.countryName
      .inputValidator(
        variables.other.helper.VALIDATION_KEYS.countryName,
        newInputValue
      )
      .printInputValidatorError()
      .executeIfNoError(() => onCountryNameInputChange(newInputValue));
  };

  const handleSelectedCountryChange = (_, newValue) => {
    onSelectedCountryChange(newValue);
  };

  const renderOption = (props, option) => (
    <Option key={option.countryName} props={props} option={option} />
  );

  return (
    <Autocomplete
      autoHighlight
      fullWidth
      getOptionLabel={getOptionLabel}
      inputValue={countryName}
      onChange={handleSelectedCountryChange}
      onInputChange={handleCountryNameInputChange}
      options={countries}
      renderInput={SelectorInput}
      renderOption={renderOption}
      value={selectedCountry}
    />
  );
};

export default CountrySelector;

// import { matchSorter } from 'match-sorter';

// const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

// <Autocomplete filterOptions={filterOptions} />;

const Option = ({ props, option }) => (
  <Box.Flex {...props}>
    <Box.Div style={{ width: "90%" }}>
      <Box.Span style={{ marginRight: "5px" }}>
        <Img
          loading="lazy"
          src={`https://flagcdn.com/w20/${option.countryShortName.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w40/${option.countryShortName.toLowerCase()}.png 2x`}
          width="20"
        />
      </Box.Span>
      {option.countryName}
    </Box.Div>

    <Box.Div style={{ width: "10%" }}>+{option.countryCode}</Box.Div>
  </Box.Flex>
);

const SelectorInput = (props) => (
  <Input.Text
    {...props}
    required
    name={variables.other.helper.ELEMENT_NAMES.COUNTRY_NAME}
    label={variables.other.helper.ELEMENT_LABELS.CHOOSE_A_COUNTRY}
    InputProps={{
      ...props.InputProps,
    }}
  />
);
