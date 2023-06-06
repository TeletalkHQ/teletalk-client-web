import { SyntheticEvent } from "react";

import Autocomplete from "@mui/material/Autocomplete";

import { validatorManager } from "~/classes/validator/ValidatorManager";

import Option from "~/components/general/input/common/countrySelector/Option";
import SelectorInput from "~/components/general/input/common/countrySelector/SelectorInput";

import { countries } from "~/data/countries";

import { CountryItem, CountryName, HTMLProps, VoidNoArgsFn } from "~/types";

interface Props {
  countryName: CountryName;
  selectedCountry: CountryItem | null;
  onInputChange: VoidNoArgsFn;
  onSelectChange: VoidNoArgsFn;
}

const CountrySelector: React.FC<Props> = ({
  countryName,
  onInputChange,
  onSelectChange,
  selectedCountry,
}) => {
  const getOptionLabel = (option: CountryItem) => option.countryName;

  const handleCountryNameInputChange = (
    _event: SyntheticEvent,
    newInputValue: string
  ) => {
    validatorManager.validators.countryName
      .inputValidator("countryName", newInputValue)
      .printInputValidatorError()
      .executeIfNoError(() => onInputChange(newInputValue));
  };

  const handleSelectedCountryChange = (
    _event: SyntheticEvent,
    newValue: CountryItem | null
  ) => {
    onSelectChange(newValue);
  };

  const renderOption = (props: HTMLProps, option: CountryItem) => (
    <Option props={props} option={option} />
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
