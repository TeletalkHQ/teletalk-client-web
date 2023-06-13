import { SyntheticEvent } from "react";

import { ListItemProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { validatorManager } from "~/classes/validator/ValidatorManager";

import Option from "~/components/general/input/common/countrySelector/Option";
import SelectorInput from "~/components/general/input/common/countrySelector/SelectorInput";

import { countries } from "~/data/countries";

import { CountryItem } from "~/types";

export type CountrySelectInputChange = (value: CountryItem | null) => void;

export type OnCountryNameInputChange = (value: string) => void;

interface Props {
  countryName: string;
  selectedCountry: CountryItem | null;
  onCountryNameInputChange: OnCountryNameInputChange;
  onSelectChange: CountrySelectInputChange;
}

const CountrySelector: React.FC<Props> = ({
  countryName,
  onCountryNameInputChange,
  onSelectChange,
  selectedCountry,
}) => {
  const getOptionLabel = (option: CountryItem) => option.countryName;

  const handleCountryNameInputChange = (
    _event: SyntheticEvent,
    value: string
  ) => {
    onCountryNameInputChange(value);
  };

  const handleSelectedCountryChange = (
    _event: SyntheticEvent,
    newValue: CountryItem | null
  ) => {
    onSelectChange(newValue);
  };

  const renderOption = (props: ListItemProps, option: CountryItem) => (
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
